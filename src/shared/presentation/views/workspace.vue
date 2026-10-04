<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { t } = useI18n();
const role = computed(() => route.meta.role || "family");
</script>

<template>
  <section class="page-heading">
    <div>
      <span class="eyebrow">{{ t("foundation") }}</span>
      <h1>{{ t(role) }}</h1>
      <p>{{ t("workspaceFoundationCopy") }}</p>
    </div>
  </section>

  <section class="foundation-grid">
    <article class="panel foundation-status">
      <span class="status-dot" aria-hidden="true" />
      <div>
        <strong>{{ t("foundationReady") }}</strong>
        <p>{{ t("foundationReadyCopy") }}</p>
      </div>
    </article>
    <article class="panel">
      <i class="pi pi-sitemap foundation-icon" aria-hidden="true" />
      <h2>{{ t("nextStepsTitle") }}</h2>
      <p>{{ t("nextStepsCopy") }}</p>
    </article>
    <article class="panel">
      <i class="pi pi-lock foundation-icon" aria-hidden="true" />
      <h2>{{ t("securityBaseTitle") }}</h2>
      <p>{{ t("securityBaseCopy") }}</p>
    </article>
  </section>
</template>
