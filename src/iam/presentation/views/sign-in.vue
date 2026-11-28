<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import Brand from "../../../shared/presentation/components/brand.vue";
import LanguagePicker from "../../../shared/presentation/components/language-picker.vue";
import { useSession } from "../../application/session.store.js";

const { t } = useI18n(),
  route = useRoute(),
  router = useRouter(),
  session = useSession(),
  email = ref(""),
  password = ref(""),
  busy = ref(false),
  error = ref("");

/**
 * Signs in and opens the workspace of the user's role.
 *
 * @returns {Promise<void>}
 */
async function submit() {
  if (!email.value.trim() || !password.value) {
    error.value = "requiredFields";
    return;
  }
  busy.value = true;
  error.value = "";
  try {
    await session.signIn(email.value.trim(), password.value);
    const redirect = route.query.redirect;
    await router.replace(
      typeof redirect === "string" && redirect.startsWith("/")
        ? redirect
        : "/" + session.user.workspace,
    );
  } catch (e) {
    error.value = "signInErrors." + (e.code ?? "UNAVAILABLE");
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <header class="topbar">
    <RouterLink to="/"><Brand /></RouterLink>
    <div class="header-actions">
      <LanguagePicker />
    </div>
  </header>
  <main id="main" tabindex="-1" class="sign-in">
    <form class="panel sign-in-form" novalidate @submit.prevent="submit">
      <h1>{{ t("signIn") }}</h1>
      <p class="muted">{{ t("signInCopy") }}</p>
      <p v-if="route.query.expired && !error" class="sign-in-notice" role="status">
        {{ t("sessionExpired") }}
      </p>
      <label class="sign-in-field">
        <span>{{ t("email") }}</span>
        <input v-model="email" type="email" autocomplete="username" required />
      </label>
      <label class="sign-in-field">
        <span>{{ t("password") }}</span>
        <input
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
        />
      </label>
      <p v-if="error" class="field-error" role="alert">{{ t(error) }}</p>
      <Button
        type="submit"
        :label="busy ? t('signingIn') : t('signIn')"
        icon="pi pi-sign-in"
        :loading="busy"
      />
    </form>
  </main>
  <footer class="footer-main">
    <span>{{ t("footer") }}</span
    ><RouterLink to="/terms" class="text-link">{{ t("terms") }}</RouterLink>
  </footer>
</template>
