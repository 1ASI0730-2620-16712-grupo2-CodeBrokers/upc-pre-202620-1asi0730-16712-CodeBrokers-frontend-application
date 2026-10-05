export const openStatuses = ["PENDING", "IN_REVIEW"];

/**
 * Alert entity within the Alerting bounded context.
 *
 * @class Alert
 */
export class Alert {
    /**
     * @param {Object} data - Alert attributes.
     */
    constructor(data) {
        Object.assign(this, data);
    }
}

/**
 * Counts pending alerts.
 *
 * @param {Alert[]} alerts - Alerts to count.
 * @returns {number} Pending alert count.
 */
export function pendingCount(alerts) {
    return alerts.filter((a) => a.status === "PENDING").length;
}
