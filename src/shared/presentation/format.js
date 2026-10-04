import { useI18n } from "vue-i18n";

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
                      locale.value === "es" ? "es-PE" : "en-US",
                      {
                          dateStyle: "medium",
                          timeStyle: "short",
                          timeZone: "America/Lima",
                      },
                  ).format(new Date(value)) + " (UTC−05:00)"
                : t("noData"),
    };
}
