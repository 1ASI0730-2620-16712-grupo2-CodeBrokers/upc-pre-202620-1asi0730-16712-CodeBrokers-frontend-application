/**
 * Creates the default notification preferences.
 *
 * @returns {Object} Default preference values.
 */
export const defaultPreferences = () => ({
    alert: { email: true, sms: false },
    statusChange: { email: true, sms: false },
    security: { email: true, sms: false },
});

/**
 * Validates notification channels and mandatory notices.
 *
 * @param {Object} value - Preferences to validate.
 * @returns {Object} Validated preferences.
 */
export function validatePreferences(value) {
    for (const event of ["alert", "statusChange", "security"]) {
        if (
            !value[event] ||
            typeof value[event].email !== "boolean" ||
            typeof value[event].sms !== "boolean"
        )
            throw new Error("invalidPreferences");
        if (value[event].sms) throw new Error("verifyChannel");
    }
    if (!value.security.email) throw new Error("mandatoryNotice");
    return value;
}
