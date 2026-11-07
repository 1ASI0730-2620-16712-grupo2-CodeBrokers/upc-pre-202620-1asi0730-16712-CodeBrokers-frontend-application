import { Alert } from "../domain/alert.js";
import { DEMO_ACTORS } from "./demo-actors.js";

/**
 * Converts API resources into Alert entities.
 *
 * @param {Object[]} resources - Alert resources.
 * @returns {Alert[]} Alert entities.
 */
export const assembleAlerts = (resources) => resources.map((r) => new Alert(r));

/**
 * Converts backend alert resources into Alert entities.
 *
 * @param {string} patientId - Front-end patient identifier.
 * @param {Object[]} resources - Alert resources from the API.
 * @param {Object[]} records - Health records already loaded for the patient.
 * @returns {Alert[]} Alert entities.
 */
export const assembleApiAlerts = (patientId, resources, records = []) =>
    resources.map(
        (r) =>
            new Alert({
                id: r.id,
                patientId,
                severity: r.severity,
                status: r.status,
                type: records.find((rec) => rec.id === r.healthRecordId)?.type ?? "alert",
                raisedAt: r.raisedAt,
                lastStatusChangeAt: r.lastStatusChangeAt,
                version: r.version,
            }),
    );

/**
 * Converts backend status changes into intervention entries.
 *
 * @param {string} alertId - Alert identifier.
 * @param {Object[]} changes - Status changes from the API.
 * @returns {Object[]} Intervention entries.
 */
export const assembleStatusHistory = (alertId, changes) =>
    changes.map((c) => {
        const actor = DEMO_ACTORS[c.changedBy];
        return {
            id: c.id,
            alertId,
            actor: actor?.name ?? null,
            role: actor?.role ?? "professional",
            from: c.fromStatus,
            to: c.toStatus,
            at: c.changedAt,
        };
    });
