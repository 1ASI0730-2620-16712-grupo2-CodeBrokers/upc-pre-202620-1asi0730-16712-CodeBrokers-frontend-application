import { onUnauthorized } from "../../shared/infrastructure/http-client.js";
import { useSession } from "./session.store.js";

/**
 * Sends the user back to the sign-in view when the backend rejects the token
 * (expired, revoked or missing).
 *
 * @param {import("vue-router").Router} router - Application router.
 */
export function handleExpiredSessions(router) {
    onUnauthorized(() => {
        useSession().clear();
        const current = router.currentRoute.value;
        if (current.name === "sign-in") return;
        router.replace({
            name: "sign-in",
            query: { redirect: current.fullPath, expired: "1" },
        });
    });
}
