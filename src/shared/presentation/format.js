import { useI18n } from "vue-i18n";
import { toLanguageTag } from "../domain/locale.js";

/**
 * Provides localized presentation formatters.
 *
 * @returns {Object} Date formatter collection.
 */
export function useFormat() {
    const { locale, t } = useI18n();
    return {
        date: (value) =>
            value
                ? new Intl.DateTimeFormat(
                      toLanguageTag(locale.value),
                      {
                          dateStyle: "medium",
                          timeStyle: "short",
                          timeZone: "America/Lima",
                      },
                  ).format(new Date(value)) + " (UTC−05:00)"
                : t("noData"),
    };
}
