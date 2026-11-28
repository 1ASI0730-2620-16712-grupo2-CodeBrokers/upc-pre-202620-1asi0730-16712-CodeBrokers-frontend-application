<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import { useSession } from "../../application/session.store.js";

const { t } = useI18n(),
  router = useRouter(),
  session = useSession();

/**
 * Signs out and returns to the sign-in view.
 *
 * @returns {Promise<void>}
 */
async function signOut() {
  await session.signOut();
  await router.replace({ name: "sign-in" });
}
</script>
<template>
  <div v-if="session.user" class="session-menu">
    <span class="session-email">{{ session.user.email }}</span>
    <Button
      :label="t('signOut')"
      icon="pi pi-sign-out"
      severity="secondary"
      outlined
      size="small"
      @click="signOut"
    />
  </div>
</template>
