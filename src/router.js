import { createRouter, createWebHashHistory } from "vue-router";
import Shell from "./shared/presentation/components/shell.vue";
import { routes as careRoutes } from "./elder-care/presentation/routes.js";

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
      name: "terms",
      component: () => import("./shared/presentation/views/terms.vue"),
      meta: { title: "terms" },
    },
    {
      path: "/",
      component: Shell,
      children: [
        ...careRoutes,
        {
          path: ":role/preferences",
          component: () => import("./shared/presentation/views/preferences.vue"),
          meta: { title: "preferences" },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("./shared/presentation/views/not-found.vue"),
      meta: { title: "notFound" },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
