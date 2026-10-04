import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Material from "@primeuix/themes/material";
import { definePreset } from "@primeuix/themes";
import "primeicons/primeicons.css";
import App from "./app.vue";
import { router } from "./router.js";
import { i18n } from "./i18n.js";
import "./style.css";
import "./feature-styles.css";

const theme = definePreset(Material, {
  semantic: {
    primary: {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#2E7D32",
      600: "#2E7D32",
      700: "#1B5E20",
      800: "#174f1b",
      900: "#123f16",
      950: "#0b2b0e",
    },
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.use(PrimeVue, {
  theme: { preset: theme, options: { darkModeSelector: ".vitalink-dark" } },
  ripple: true,
});
app.use(router);

router.isReady().then(() => app.mount("#app"));
