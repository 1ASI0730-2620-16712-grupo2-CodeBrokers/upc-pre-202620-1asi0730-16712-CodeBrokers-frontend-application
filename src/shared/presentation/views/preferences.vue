<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="page-heading">
    <div>
      <span class="eyebrow">{{ t("foundation") }}</span>
      <h1>{{ t("preferences") }}</h1>
      <p>{{ t("preferencesFoundationCopy") }}</p>
    </div>
  </section>

  <section class="panel">
    <div class="empty-state">
      <i class="pi pi-sliders-h" aria-hidden="true" />
      <h2>{{ t("preferencesReadyTitle") }}</h2>
      <p>{{ t("preferencesReadyCopy") }}</p>
    </div>
  </section>
</template>
