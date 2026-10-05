<script setup>
import { nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const route = useRoute();
const { t, locale } = useI18n();
watch(
  [() => route.meta.title, locale],
  () => {
    document.title = `${t(route.meta.title || "brand")} · VitaLink`;
    document.documentElement.lang = locale.value === "es" ? "es" : "en";
  },
  { immediate: true },
);
watch(
  () => route.path,
  async () => {
    await nextTick();
    document.querySelector("main")?.focus();
  },
);
</script>
<template>
  <a
    class="skip"
    href="#main"
    @click.prevent="
      $event.currentTarget.ownerDocument.getElementById('main')?.focus()
    "
    >{{ t("skip") }}</a
  ><RouterView />
</template>
