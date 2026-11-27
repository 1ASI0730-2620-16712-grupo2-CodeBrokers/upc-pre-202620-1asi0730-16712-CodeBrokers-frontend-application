const SESSION_KEY = "vitalink.session";

/**
 * Reads the stored session (token and user) from the browser.
 *
 * @returns {{token: string, user: Object}|null} Stored session, or null when there is none.
 */
export function readStoredSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

/**
 * Saves the session so it survives a page reload.
 *
 * @param {{token: string, user: Object}} session - Session returned by the sign-in.
 */
export function saveStoredSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Removes the stored session.
 */
export function clearStoredSession() {
    localStorage.removeItem(SESSION_KEY);
}
