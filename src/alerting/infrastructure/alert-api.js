import axios from "axios";
import { OLDER_ADULT_IDS } from "../../preventive-monitoring/infrastructure/older-adult-ids.js";
import { assembleApiAlerts, assembleStatusHistory } from "./alert.assembler.js";
import { DEMO_PROFESSIONAL_ID } from "./demo-actors.js";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_BACKEND_API_BASE_URL ||
        "http://localhost:5270/api/v1",
    timeout: 5000,
});

/**
 * Error raised when an alert status change cannot be completed.
 *
 * @class AlertStatusError
 */
export class AlertStatusError extends Error {
    constructor(code) {
        super(code);
        this.code = code;
    }
}

/**
 * Reads the alerts of one patient with their status history.
 *
 * @param {string} patientId - Front-end patient identifier.
 * @param {Object[]} records - Health records already loaded for the patient.
 * @returns {Promise<{alerts: Object[], interventions: Object[]}>}
 */
export async function readAlerts(patientId, records = []) {
    const guid = OLDER_ADULT_IDS[patientId];
    if (!guid) return { alerts: [], interventions: [] };
    const page = await api.get("/alerts", {
        params: { olderAdultId: guid, pageSize: 100 },
    });
    const alerts = assembleApiAlerts(patientId, page.data.items, records);
    const histories = await Promise.all(
        alerts.map((a) =>
            api
                .get(`/alerts/${a.id}/status/history`)
                .then((r) => assembleStatusHistory(a.id, r.data)),
        ),
    );
    return { alerts, interventions: histories.flat() };
}

/**
 * Changes the status of an alert, sending the version that was read.
 *
 * @param {Object} alert - Alert being changed.
 * @param {"IN_REVIEW"|"ATTENDED"} status - Requested status.
 * @returns {Promise<void>}
 */
export async function changeAlertStatus(alert, status) {
    try {
        await api.patch(`/alerts/${alert.id}/status`, {
            status,
            changedBy: DEMO_PROFESSIONAL_ID,
            version: alert.version,
        });
    } catch (error) {
        const code = { 409: "CONFLICT", 404: "NOT_FOUND", 400: "INVALID" }[
            error.response?.status
        ];
        throw new AlertStatusError(code ?? "UNAVAILABLE");
    }
}
