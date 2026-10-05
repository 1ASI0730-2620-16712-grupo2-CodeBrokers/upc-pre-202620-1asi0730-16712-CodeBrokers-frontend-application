<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<template>
  <main id="main" tabindex="-1" class="entry">
    <p class="eyebrow">404</p>
    <h1>{{ t("notFound") }}</h1>
    <p>{{ t("notFoundCopy") }}</p>
    <RouterLink to="/" class="text-link">{{ t("backHome") }}</RouterLink>
  </main>
</template>
