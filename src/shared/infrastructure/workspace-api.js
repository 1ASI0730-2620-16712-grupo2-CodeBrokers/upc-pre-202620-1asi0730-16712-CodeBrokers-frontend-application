import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
    timeout: 5000,
});

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
    const scope = data.patients.filter((patient) =>
        role === "professional"
            ? patient.providerId === "DR-01"
            : role === "family"
              ? patient.familyIds.includes("FC-01")
              : patient.id === "P-101",
    );

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
 * Retrieves the workspace resources from JSON Server.
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
        const [patients, alerts, records, interventions] = await Promise.all([
            api.get("/patients"),
            api.get("/alerts"),
            api.get("/records"),
            api.get("/interventions"),
        ]);

        return applyScope(
            {
                patients: patients.data,
                alerts: alerts.data,
                records: records.data,
                interventions: interventions.data,
            },
            role,
            scenario,
        );
    } catch (error) {
        throw new WorkspaceApiError(
            error.code === "ECONNABORTED" ? "TIMEOUT" : "UNAVAILABLE",
        );
    }
}
