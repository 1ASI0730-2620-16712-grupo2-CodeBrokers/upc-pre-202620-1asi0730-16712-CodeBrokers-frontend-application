<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps({ value: String });
</script>
<template>
  <span class="tag" :class="value"
    ><span class="tag-dot" aria-hidden="true" />{{ t("codes." + value) }}</span
  >
</template>
