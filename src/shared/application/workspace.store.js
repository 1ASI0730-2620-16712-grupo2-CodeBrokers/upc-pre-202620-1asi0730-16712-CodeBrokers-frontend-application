import { defineStore } from "pinia";
import { ref } from "vue";
import { readWorkspace } from "../infrastructure/workspace-api.js";
import { assemblePatients } from "../../elder-care/infrastructure/patient.assembler.js";
import { assembleAlerts } from "../../alerting/infrastructure/alert.assembler.js";
import { changeAlertStatus } from "../../alerting/infrastructure/alert-api.js";

/**
 * Coordinates the care workspace data displayed by the UI.
 *
 * @module useWorkspace
 */
export const useWorkspace = defineStore("workspace", () => {
    const patients = ref([]),
        alerts = ref([]),
        records = ref([]),
        interventions = ref([]),
        loading = ref(false),
        error = ref(""),
        stale = ref(false),
        lastFetched = ref(null),
        role = ref(""),
        scenario = ref("normal");
    const actionError = ref(null),
        changingId = ref("");
    let sequence = 0;

    /**
     * Loads the scoped workspace for the selected role.
     *
     * @param {string} nextRole - Role whose data will be loaded.
     * @returns {Promise<void>}
     */
    async function load(nextRole = role.value) {
        const token = ++sequence;
        if (nextRole !== role.value) {
            patients.value = [];
            alerts.value = [];
            records.value = [];
            interventions.value = [];
            lastFetched.value = null;
        }
        role.value = nextRole;
        loading.value = true;
        error.value = "";
        stale.value = false;
        try {
            const data = await readWorkspace(nextRole, scenario.value);
            if (token !== sequence) return;
            const nextAlerts = assembleAlerts(data.alerts),
                nextPatients = assemblePatients(data.patients);
            patients.value = nextPatients;
            alerts.value = nextAlerts;
            records.value = data.records;
            interventions.value = data.interventions;
            lastFetched.value = new Date().toISOString();
        } catch (e) {
            if (token !== sequence) return;
            error.value =
                e.message === "INVALID_PRIORITY" ? "invalidData" : "loadError";
            stale.value = lastFetched.value !== null;
        } finally {
            if (token === sequence) loading.value = false;
        }
    }

    /**
     * Changes the status of an alert and refreshes the workspace.
     *
     * @param {Object} alert - Alert to change.
     * @param {"IN_REVIEW"|"ATTENDED"} status - Requested status.
     * @returns {Promise<void>}
     */
    async function changeStatus(alert, status) {
        changingId.value = alert.id;
        actionError.value = null;
        try {
            await changeAlertStatus(alert, status);
            await load();
        } catch (e) {
            actionError.value = { alertId: alert.id, code: e.code || "UNAVAILABLE" };
            if (e.code === "CONFLICT") await load();
        } finally {
            changingId.value = "";
        }
    }
    return {
        patients,
        alerts,
        records,
        interventions,
        loading,
        error,
        stale,
        lastFetched,
        role,
        scenario,
        load,
        actionError,
        changingId,
        changeStatus,
    };
});
