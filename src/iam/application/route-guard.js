import { useSession } from "./session.store.js";

/**
 * Protects the workspace routes:
 * - without a valid session, the user is sent to the sign-in view;
 * - with a session, each role can only open its own workspace.
 * A route is protected when its meta declares a role.
 *
 * @param {import("vue-router").Router} router - Application router.
 */
export function protectRoutes(router) {
    router.beforeEach((to) => {
        const session = useSession();

        if (!session.isSignedIn && session.session) session.clear();

        if (to.name === "sign-in" && session.isSignedIn) {
            return "/" + session.user.workspace;
        }

        if (!to.meta.role) return true;

        if (!session.isSignedIn) {
            return { name: "sign-in", query: { redirect: to.fullPath } };
        }

        if (to.meta.role !== session.user.workspace) {
            return "/" + session.user.workspace;
        }

        return true;
    });
}
