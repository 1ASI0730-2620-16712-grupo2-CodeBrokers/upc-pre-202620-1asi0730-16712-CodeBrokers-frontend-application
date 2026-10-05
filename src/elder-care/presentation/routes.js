/**
 * Routes exposed by the Elder Care experience.
 */
export const routes = [
    {
        path: "/professional",
        name: "professional",
        component: () => import("../../shared/presentation/views/stage.vue"),
        meta: { role: "professional", title: "careOverview" },
    },
    {
        path: "/professional/patients",
        component: () => import("../../shared/presentation/views/stage.vue"),
        meta: { role: "professional", title: "assignedPatients" },
    },
    {
        path: "/professional/patients/:id",
        component: () => import("../../shared/presentation/views/stage.vue"),
        meta: { role: "professional", title: "patientDetail" },
    },
    {
        path: "/professional/patients/:id/history",
        component: () => import("../../shared/presentation/views/stage.vue"),
        meta: { role: "professional", title: "healthHistory" },
    },
    {
        path: "/family",
        name: "family",
        component: () => import("../../shared/presentation/views/stage.vue"),
        meta: { role: "family", title: "familyOverview" },
    },
    {
        path: "/family/cases/:id",
        component: () => import("../../shared/presentation/views/stage.vue"),
        meta: { role: "family", title: "caseFollowUp" },
    },
    {
        path: "/older-adult",
        name: "older-adult",
        component: () => import("../../shared/presentation/views/stage.vue"),
        meta: { role: "older-adult", title: "older-adult" },
    },
];
