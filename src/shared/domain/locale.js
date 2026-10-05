export const DEFAULT_LOCALE = "en_US";

export const SUPPORTED_LOCALES = Object.freeze(["en_US", "es_419"]);

const aliases = Object.freeze({
    en: "en_US",
    "en-US": "en_US",
    en_US: "en_US",
    es: "es_419",
    "es-419": "es_419",
    es_419: "es_419",
});

/**
 * Resolves stored and legacy locale identifiers.
 *
 * @param {string|null|undefined} value - Locale identifier.
 * @returns {string} Supported locale identifier.
 */
export function normalizeLocale(value) {
    return aliases[value] ?? DEFAULT_LOCALE;
}

/**
 * Converts an application locale to a BCP 47 language tag.
 *
 * @param {string} value - Application locale identifier.
 * @returns {string} Language tag for browser APIs.
 */
export function toLanguageTag(value) {
    return normalizeLocale(value) === "es_419" ? "es-419" : "en-US";
}
