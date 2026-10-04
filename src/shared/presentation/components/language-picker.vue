<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function changeLanguage(event) {
  locale.value = event.target.value;
  try {
    localStorage.setItem("vitalink.locale", locale.value);
  } catch {
    // Storage is optional; the UI still works without it.
  }
}
</script>

<template>
  <label class="language-picker">
    <span class="sr-only">{{ $t("language") }}</span>
    <select :value="locale" @change="changeLanguage">
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  </label>
</template>
