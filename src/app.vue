<script setup>
import { nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toLanguageTag } from "./shared/domain/locale.js";
const route = useRoute();
const { t, locale } = useI18n();
const announcement = ref("");
watch(
  [() => route.meta.title, locale],
  async () => {
    const title = t(route.meta.title || "brand");
    document.title = `${title} · VitaLink`;
    document.documentElement.lang = toLanguageTag(locale.value);
    announcement.value = "";
    await nextTick();
    announcement.value = title;
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
  ><p class="sr-only" aria-live="polite" aria-atomic="true">
    {{ announcement }}
  </p>
  <RouterView />
</template>
