/**
 * Routes exposed by the IAM context.
 */
export const routes = [
    {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("./views/sign-in.vue"),
        meta: { title: "signIn" },
    },
];
