import { defineStore } from "pinia";
import { computed, ref } from "vue";
import * as authenticationApi from "../infrastructure/authentication-api.js";
import {
    clearStoredSession,
    readStoredSession,
    saveStoredSession,
} from "../../shared/infrastructure/session-storage.js";

/**
 * Keeps the session of the signed-in user.
 *
 * @module useSession
 */
export const useSession = defineStore("session", () => {
    const session = ref(readStoredSession());

    const user = computed(() => session.value?.user ?? null);
    const isSignedIn = computed(
        () =>
            !!session.value?.token &&
            new Date(session.value.expiresAt).getTime() > Date.now(),
    );

    /**
     * Signs in and stores the session.
     *
     * @param {string} email - Account email.
     * @param {string} password - Account password.
     * @returns {Promise<void>}
     */
    async function signIn(email, password) {
        const next = await authenticationApi.signIn(email, password);
        saveStoredSession(next);
        session.value = next;
    }

    /**
     * Signs out. The local session is cleared even if the backend cannot be reached.
     *
     * @returns {Promise<void>}
     */
    async function signOut() {
        try {
            if (isSignedIn.value) await authenticationApi.signOut();
        } finally {
            clear();
        }
    }

    /**
     * Clears the local session without calling the backend.
     */
    function clear() {
        clearStoredSession();
        session.value = null;
    }

    return { session, user, isSignedIn, signIn, signOut, clear };
});
