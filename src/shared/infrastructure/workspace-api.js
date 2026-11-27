import { readAlerts } from "../../alerting/infrastructure/alert-api.js";
import { readOlderAdults } from "../../elder-care/infrastructure/older-adult-api.js";
import { assembleOlderAdult } from "../../elder-care/infrastructure/older-adult.assembler.js";
import { readHealthRecords } from "../../preventive-monitoring/infrastructure/health-record-api.js";

/**
 * Error returned by the care data service.
 *
 * @class WorkspaceApiError
 */
export class WorkspaceApiError extends Error {
    constructor(code) {
        super(code);
        this.code = code;
    }
}

/**
 * Applies role scope and the selected data scenario.
 *
 * @param {Object} data - API resource collections.
 * @param {string} role - Current role.
 * @param {string} scenario - Data scenario.
 * @returns {Object} Scoped workspace resources.
 */
function applyScope(data, role, scenario) {
    // TODO: filter the patients by the signed-in user once the session is available (VTL-79).
    // Until then every role sees the older adults returned by the backend.
    const scope = data.patients;

    if (scenario === "empty") {
        return { patients: [], alerts: [], records: [], interventions: [] };
    }

    const patientIds = new Set(scope.map((patient) => patient.id));
    let scopedAlerts = data.alerts
        .filter((alert) => patientIds.has(alert.patientId))
        .map((alert) => ({ ...alert }));
    const interventions = data.interventions.map((intervention) => ({
        ...intervention,
    }));

    if (scenario === "updated") {
        scopedAlerts = scopedAlerts.map((alert) =>
            alert.id === "A-101" ? { ...alert, status: "IN_REVIEW" } : alert,
        );
        interventions.push({
            id: "I-06",
            alertId: "A-101",
            actor: "Dr. Sofía Torres",
            role: "professional",
            from: "PENDING",
            to: "IN_REVIEW",
            at: "2026-10-03T04:30:00Z",
        });
    }

    if (scenario === "invalid" && scopedAlerts.length) {
        scopedAlerts[0] = { ...scopedAlerts[0], severity: "UNKNOWN" };
    }

    return {
        patients: scope,
        alerts: scopedAlerts,
        records: data.records.filter((record) =>
            patientIds.has(record.patientId),
        ),
        interventions: interventions.filter((intervention) =>
            scopedAlerts.some((alert) => alert.id === intervention.alertId),
        ),
    };
}

/**
 * Retrieves the workspace resources from the backend.
 *
 * @param {string} role - Current role.
 * @param {string} scenario - Data scenario.
 * @returns {Promise<Object>} Workspace resources.
 */
export async function readWorkspace(role, scenario = "normal") {
    if (scenario === "error") {
        throw new WorkspaceApiError("UNAVAILABLE");
    }

    try {
        const olderAdults = await readOlderAdults();
        const recordsByPatient = await Promise.all(
            olderAdults.map((o) =>
                readHealthRecords(o.id).catch(() => []),
            ),
        );
        const patients = olderAdults.map((o, i) =>
            assembleOlderAdult(o, recordsByPatient[i] ?? []),
        );
        const scoped = applyScope(
            {
                patients,
                alerts: [],
                records: recordsByPatient.flat(),
                interventions: [],
            },
            role,
            scenario,
        );
        const byPatient = await Promise.all(
            scoped.patients.map((p) =>
                readAlerts(p.id, scoped.records.filter((r) => r.patientId === p.id)),
            ),
        );
        return {
            ...scoped,
            alerts: byPatient.flatMap((x) => x.alerts),
            interventions: byPatient.flatMap((x) => x.interventions),
        };
    } catch (error) {
        throw new WorkspaceApiError(
            error.code === "ECONNABORTED" ? "TIMEOUT" : "UNAVAILABLE",
        );
    }
}
