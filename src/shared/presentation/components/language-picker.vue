<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
const { t, locale } = useI18n();
const error = ref(false);

/**
 * Updates and stores the selected locale.
 *
 * @param {Event} event - Language selection event.
 */
function set(event) {
  locale.value = event.target.value;
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
    ><select id="header-language" :value="locale" @change="set">
      <option value="en">EN</option>
      <option value="es">ES</option></select
    ><span v-if="error" role="alert">{{ t("storageError") }}</span>
  </div>
</template>
