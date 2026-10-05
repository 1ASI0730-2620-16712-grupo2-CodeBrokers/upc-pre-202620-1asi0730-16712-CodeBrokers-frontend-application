import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

// Restores the last language selected in this browser.
let saved;
try {
    saved = localStorage.getItem("vitalink.locale");
} catch {}
export const i18n = createI18n({
    legacy: false,
    locale: ["en", "es"].includes(saved) ? saved : "en",
    fallbackLocale: "en",
    messages: { en, es },
    missing: (_locale, key) =>
        console.warn(`[i18n] Missing translation: ${key}`),
});
