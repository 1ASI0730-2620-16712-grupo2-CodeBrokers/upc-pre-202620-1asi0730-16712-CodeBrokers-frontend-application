const priority = { HIGH: 3, MEDIUM: 2, LOW: 1 };
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
        if (!(data.severity in priority)) throw new Error("INVALID_PRIORITY");
        Object.assign(this, data);
    }
}

/**
 * Orders alerts by priority, creation date and identifier.
 *
 * @param {Alert[]} alerts - Alerts to order.
 * @param {"asc"|"desc"} direction - Priority direction.
 * @returns {Alert[]} Ordered alerts.
 */
export function orderAlerts(alerts, direction = "desc") {
    return [...alerts].sort(
        (a, b) =>
            (priority[b.severity] - priority[a.severity]) *
                (direction === "desc" ? 1 : -1) ||
            a.raisedAt.localeCompare(b.raisedAt) ||
            a.id.localeCompare(b.id),
    );
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
