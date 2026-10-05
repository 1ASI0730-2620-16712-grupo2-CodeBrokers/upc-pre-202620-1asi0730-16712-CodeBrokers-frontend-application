import {
    defaultPreferences,
    validatePreferences,
} from "../domain/preferences.js";

/**
 * Loads preferences stored for a role.
 *
 * @param {string} role - Current role.
 * @returns {Object} Stored or default preferences.
 */
export function loadPreferences(role) {
    try {
        const value = JSON.parse(
            localStorage.getItem("vitalink.preferences." + role),
        );
        return value ? validatePreferences(value) : defaultPreferences();
    } catch {
        return defaultPreferences();
    }
}

/**
 * Persists validated preferences for a role.
 *
 * @param {string} role - Current role.
 * @param {Object} value - Preferences to save.
 * @returns {Promise<Object>} Saved preferences.
 */
export async function savePreferences(role, value) {
    validatePreferences(value);
    await new Promise((r) => setTimeout(r, 200));
    try {
        localStorage.setItem(
            "vitalink.preferences." + role,
            JSON.stringify(value),
        );
    } catch {
        throw new Error("storageError");
    }
    return structuredClone(value);
}
