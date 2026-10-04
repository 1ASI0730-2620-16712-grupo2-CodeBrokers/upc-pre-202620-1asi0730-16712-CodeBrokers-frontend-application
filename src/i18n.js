import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

let saved;
try {
  saved = localStorage.getItem("vitalink.locale");
} catch {
  saved = null;
}

export const i18n = createI18n({
  legacy: false,
  locale: ["en", "es"].includes(saved) ? saved : "es",
  fallbackLocale: "es",
  messages: { en, es },
});
