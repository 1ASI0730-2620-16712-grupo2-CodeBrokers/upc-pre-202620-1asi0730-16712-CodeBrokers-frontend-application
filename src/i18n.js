import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";
import {
    DEFAULT_LOCALE,
    normalizeLocale,
} from "./shared/domain/locale.js";

// Restores the last language selected in this browser.
let saved;
try {
    const stored = localStorage.getItem("vitalink.locale");
    saved = normalizeLocale(stored);
    if (stored && stored !== saved)
        localStorage.setItem("vitalink.locale", saved);
} catch {}
export const i18n = createI18n({
    legacy: false,
    locale: saved ?? DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: { en_US: en, es_419: es },
    missing: (_locale, key) =>
        console.warn(`[i18n] Missing translation: ${key}`),
});
