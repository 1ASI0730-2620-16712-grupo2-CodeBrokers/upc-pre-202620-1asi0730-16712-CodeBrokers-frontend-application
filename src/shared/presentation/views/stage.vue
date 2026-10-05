<script setup>
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();
</script>

<template>
  <section class="panel">
    <h1>{{ t(route.meta.title || "older-adult") }}</h1>
  </section>
</template>
