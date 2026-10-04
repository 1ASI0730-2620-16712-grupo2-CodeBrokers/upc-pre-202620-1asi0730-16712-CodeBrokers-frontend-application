<script setup>
import LanguagePicker from "../components/language-picker.vue";
import Brand from "../components/brand.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const roles = [
  { id: "professional", icon: "pi pi-briefcase" },
  { id: "family", icon: "pi pi-users" },
  { id: "older-adult", icon: "pi pi-heart" },
];
</script>

<template>
  <header class="topbar">
    <Brand />
    <div class="header-actions"><LanguagePicker /></div>
  </header>

  <main id="main" tabindex="-1" class="entry">
    <div class="entry-intro">
      <span class="eyebrow">{{ t("connected") }}</span>
      <h1>{{ t("welcome") }}</h1>
      <p>{{ t("welcomeCopy") }}</p>
      <div class="entry-note">
        <i class="pi pi-shield" aria-hidden="true" />
        <span>{{ t("serviceNotice") }}</span>
      </div>
    </div>

    <section class="role-grid" :aria-label="t('chooseRole')">
      <RouterLink v-for="role in roles" :key="role.id" :to="'/' + role.id" class="role-card">
        <span :class="role.icon" aria-hidden="true" />
        <h2>{{ t(role.id) }}</h2>
        <p>{{ t(role.id + 'Copy') }}</p>
        <span class="role-action">{{ t("openWorkspace") }} <i class="pi pi-arrow-right" aria-hidden="true" /></span>
      </RouterLink>
    </section>

    <section class="foundation-card panel" aria-labelledby="foundation-title">
      <span class="eyebrow">{{ t("foundation") }}</span>
      <h2 id="foundation-title">{{ t("foundationTitle") }}</h2>
      <p>{{ t("foundationCopy") }}</p>
    </section>
  </main>

  <footer class="footer-main">
    <span>{{ t("footer") }}</span>
    <RouterLink to="/terms" class="text-link">{{ t("terms") }}</RouterLink>
  </footer>
</template>
