<script setup>
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps({
  loading: Boolean,
  error: String,
  empty: Boolean,
  stale: Boolean,
});
defineEmits(["retry"]);
</script>
<template>
  <div
    v-if="loading"
    class="state panel"
    role="status"
    aria-live="polite"
    aria-atomic="true"
    aria-busy="true"
  >
    <i class="pi pi-spin pi-spinner" aria-hidden="true" /> {{ t("loading") }}
  </div>
  <div v-else-if="error" class="state panel error-state" role="alert">
    <h2>{{ t(error) }}</h2>
    <p>{{ t(stale ? "staleCopy" : "errorCopy") }}</p>
    <Button :label="t('retry')" icon="pi pi-refresh" @click="$emit('retry')" />
  </div>
  <div
    v-else-if="empty"
    class="state panel"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <i class="pi pi-inbox" aria-hidden="true" />
    <h2>{{ t("emptyTitle") }}</h2>
    <p>{{ t("emptyCopy") }}</p>
  </div>
</template>
