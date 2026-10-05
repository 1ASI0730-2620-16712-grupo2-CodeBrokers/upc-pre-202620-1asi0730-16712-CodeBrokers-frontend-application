<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { normalizeLocale } from "../../domain/locale.js";
const { t, locale } = useI18n();
const error = ref(false);

/**
 * Updates and stores the selected locale.
 *
 * @param {Event} event - Language selection event.
 */
function set(event) {
  locale.value = normalizeLocale(event.target.value);
  try {
    localStorage.setItem("vitalink.locale", locale.value);
    error.value = false;
  } catch {
    error.value = true;
  }
}
</script>
<template>
  <div class="language-picker">
    <label class="sr-only" for="header-language">{{ t("language") }}</label
    ><select
      id="header-language"
      :value="locale"
      :aria-describedby="error ? 'header-language-error' : undefined"
      @change="set"
    >
      <option value="en_US">EN</option>
      <option value="es_419">ES</option></select
    ><span v-if="error" id="header-language-error" role="alert">{{
      t("storageError")
    }}</span>
  </div>
</template>
