import { createRouter, createWebHashHistory } from "vue-router";
import Shell from "./shared/presentation/components/shell.vue";
import { routes as careRoutes } from "./elder-care/presentation/routes.js";

/**
 * Application router with lazy-loaded feature views.
 */
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "entry",
            component: () => import("./shared/presentation/views/entry.vue"),
            meta: { title: "welcome" },
        },
        {
            path: "/terms",
            component: () => import("./shared/presentation/views/terms.vue"),
            meta: { title: "terms" },
        },
        {
            path: "/",
            component: Shell,
            children: [
                ...careRoutes,
                ...["professional", "family", "older-adult"].map((role) => ({
                    path: "/" + role + "/preferences",
                    component: () =>
                        import("./shared/presentation/views/stage.vue"),
                    meta: { role, title: "preferences" },
                })),
            ],
        },
        {
            path: "/:pathMatch(.*)*",
            component: () =>
                import("./shared/presentation/views/not-found.vue"),
            meta: { title: "notFound" },
        },
    ],
    scrollBehavior: () => ({ top: 0 }),
});
