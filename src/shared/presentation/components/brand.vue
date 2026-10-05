<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<template>
  <span class="brand"
    ><span class="brand-symbol" aria-hidden="true"
      ><i class="pi pi-heart-fill"></i><span>+</span></span
    ><span
      >VitaLink<small>{{ t("connected") }}</small></span
    ></span
  >
</template>
