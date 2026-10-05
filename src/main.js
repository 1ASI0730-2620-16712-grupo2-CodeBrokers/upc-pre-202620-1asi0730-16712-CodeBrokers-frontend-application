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

// Defines the primary colors used by PrimeVue components.
const theme = definePreset(Material, {
    semantic: {
        primary: {
            50: "#eefbf5",
            100: "#d5f5e5",
            200: "#ace9ce",
            300: "#74d6ae",
            400: "#39b98b",
            500: "#00694c",
            600: "#00694c",
            700: "#09563f",
            800: "#104535",
            900: "#10392d",
            950: "#042219",
        },
    },
});

// Registers the application plugins before mounting the root component.
const app = createApp(App)
    .use(createPinia())
    .use(i18n)
    .use(PrimeVue, {
        theme: {
            preset: theme,
            options: { darkModeSelector: ".vitalink-dark" },
        },
        ripple: true,
    })
    .use(router);
router.isReady().then(() => app.mount("#app"));
