import { createRouter, createWebHashHistory } from "vue-router";
import Shell from "./shared/presentation/components/shell.vue";
import { routes as careRoutes } from "./elder-care/presentation/routes.js";
import { routes as iamRoutes } from "./iam/presentation/routes.js";

/**
 * Application router with lazy-loaded feature views.
 */
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            // The app starts at the sign-in view; a signed-in user is sent to their workspace.
            path: "/",
            name: "entry",
            redirect: { name: "sign-in" },
        },
        {
            path: "/terms",
            component: () => import("./shared/presentation/views/terms.vue"),
            meta: { title: "terms" },
        },
        ...iamRoutes,
        {
            path: "/",
            component: Shell,
            children: [
                ...careRoutes,
                ...["professional", "family", "older-adult"].map((role) => ({
                    path: "/" + role + "/preferences",
                    component: () =>
                        import(
                            "./notification/presentation/views/preferences.vue"
                            ),
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
