<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<template>
  <main id="main" tabindex="-1" class="entry">
    <p class="eyebrow">VitaLink · CodeBrokers</p>
    <h1>{{ t("terms") }}</h1>
    <section class="panel">
      <h2>{{ t("academicUse") }}</h2>
      <p>{{ t("serviceNotice") }}</p>
      <p>{{ t("termsCopy") }}</p>
      <p>{{ t("termsStorage") }}</p>
      <RouterLink to="/" class="text-link">{{ t("backHome") }}</RouterLink>
    </section>
  </main>
</template>
