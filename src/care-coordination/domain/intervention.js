/**
 * Returns the ordered intervention history for an alert.
 *
 * @param {Object[]} interventions - Available interventions.
 * @param {string} alertId - Alert identifier.
 * @returns {Object[]} Ordered intervention history.
 */
export function timeline(interventions, alertId) {
    return interventions
        .filter((i) => i.alertId === alertId)
        .sort((a, b) => a.at.localeCompare(b.at) || a.id.localeCompare(b.id));
}

/**
 * Finds the latest professional intervention for an alert.
 *
 * @param {Object[]} interventions - Available interventions.
 * @param {string} alertId - Alert identifier.
 * @returns {Object|null} Latest professional intervention.
 */
export function latestProfessional(interventions, alertId) {
    return (
        timeline(interventions, alertId)
            .filter((i) => i.role === "professional")
            .at(-1) || null
    );
}
