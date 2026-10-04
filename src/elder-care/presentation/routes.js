/**
 * Foundation routes. Feature-specific routes will be added in later advances.
 */
export const routes = [
  {
    path: "/professional",
    name: "professional",
    component: () => import("../../shared/presentation/views/workspace.vue"),
    meta: { role: "professional", title: "professional" },
  },
  {
    path: "/family",
    name: "family",
    component: () => import("../../shared/presentation/views/workspace.vue"),
    meta: { role: "family", title: "family" },
  },
  {
    path: "/older-adult",
    name: "older-adult",
    component: () => import("../../shared/presentation/views/workspace.vue"),
    meta: { role: "older-adult", title: "older-adult" },
  },
];
