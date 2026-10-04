<script setup>
import Brand from "./brand.vue";
import LanguagePicker from "./language-picker.vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import Button from "primevue/button";

const { t } = useI18n();
const route = useRoute();
const menu = ref(false);
const currentRole = computed(() => route.meta.role || route.path.split("/")[1] || "family");

watch(() => route.path, () => (menu.value = false));
</script>

<template>
  <header class="topbar">
    <RouterLink to="/" aria-label="VitaLink"><Brand /></RouterLink>
    <div class="header-actions">
      <LanguagePicker />
      <RouterLink to="/" class="text-link">{{ t("switchRole") }}</RouterLink>
      <Button
        class="mobile-menu"
        icon="pi pi-bars"
        :aria-label="t('toggleMenu')"
        :aria-expanded="menu"
        aria-controls="main-navigation"
        outlined
        severity="secondary"
        @click="menu = !menu"
      />
    </div>
  </header>

  <div class="app-layout">
    <aside class="sidebar" :class="{ expanded: menu }">
      <p class="eyebrow">{{ t("workspace") }}</p>
      <nav id="main-navigation" :aria-label="t('navigation')">
        <RouterLink :to="'/' + currentRole">
          <i class="pi pi-th-large" aria-hidden="true" />{{ t("overview") }}
        </RouterLink>
        <RouterLink :to="'/' + currentRole + '/preferences'">
          <i class="pi pi-sliders-h" aria-hidden="true" />{{ t("preferences") }}
        </RouterLink>
      </nav>
    </aside>

    <main id="main" tabindex="-1" class="content">
      <RouterView :key="route.path" />
    </main>
  </div>

  <footer>
    <div class="footer-main">
      <span>{{ t("footer") }}</span>
      <RouterLink class="text-link" to="/terms">{{ t("terms") }}</RouterLink>
    </div>
  </footer>
</template>
