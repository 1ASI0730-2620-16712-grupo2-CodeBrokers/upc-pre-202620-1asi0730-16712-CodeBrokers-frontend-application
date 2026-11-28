<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Brand from "../../../shared/presentation/components/brand.vue";
import LanguagePicker from "../../../shared/presentation/components/language-picker.vue";
import { useSession } from "../../application/session.store.js";

const { t } = useI18n(),
  route = useRoute(),
  router = useRouter(),
  session = useSession(),
  email = ref(""),
  password = ref(""),
  showPassword = ref(false),
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
    <Brand />
    <div class="header-actions">
      <LanguagePicker />
    </div>
  </header>
  <main id="main" tabindex="-1" class="sign-in">
    <section class="sign-in-card">
      <aside class="sign-in-aside">
        <div class="sign-in-aside-brand">
          <span class="sign-in-aside-logo" aria-hidden="true"
            ><i class="pi pi-heart-fill"
          /></span>
          <div>
            <p class="sign-in-aside-name">VitaLink</p>
            <p class="sign-in-aside-tagline">{{ t("connected") }}</p>
          </div>
        </div>
        <p class="sign-in-aside-copy">{{ t("signInBrandCopy") }}</p>
      </aside>

      <form class="sign-in-form" novalidate @submit.prevent="submit">
        <h1>{{ t("signIn") }}</h1>
        <p class="muted">{{ t("signInCopy") }}</p>
        <p
          v-if="route.query.expired && !error"
          class="sign-in-notice"
          role="status"
        >
          {{ t("sessionExpired") }}
        </p>

        <label class="sign-in-field">
          <span>{{ t("emailAddress") }}</span>
          <input
            v-model="email"
            type="email"
            autocomplete="username"
            required
          />
        </label>
        <label class="sign-in-field">
          <span>{{ t("password") }}</span>
          <span class="sign-in-password">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="sign-in-eye"
              :aria-label="showPassword ? t('hidePassword') : t('showPassword')"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            >
              <i
                :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                aria-hidden="true"
              />
            </button>
          </span>
        </label>

        <p v-if="error" class="field-error" role="alert">{{ t(error) }}</p>

        <button type="submit" class="sign-in-submit" :disabled="busy">
          <span>{{ busy ? t("signingIn") : t("signInSubmit") }}</span>
          <i
            :class="busy ? 'pi pi-spin pi-spinner' : 'pi pi-arrow-right'"
            aria-hidden="true"
          />
        </button>

        <div class="sign-in-register">
          <p>{{ t("noAccount") }}</p>
          <RouterLink to="/register/family-caregiver" class="text-link"
            >{{ t("createAccount") }}
            <i class="pi pi-arrow-up-right" aria-hidden="true"
          /></RouterLink>
        </div>
      </form>
    </section>
  </main>
</template>
