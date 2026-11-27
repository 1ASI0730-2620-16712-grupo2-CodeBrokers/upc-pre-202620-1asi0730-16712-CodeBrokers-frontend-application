/**
 * Workspace opened by each backend role.
 */
const WORKSPACE_BY_ROLE = {
    CARE_PROVIDER: "professional",
    FAMILY_CAREGIVER: "family",
    OLDER_ADULT: "older-adult",
};

/**
 * Converts the sign-in response of the backend into the session used by the front end.
 *
 * @param {Object} resource - Authenticated user returned by the backend.
 * @returns {{token: string, expiresAt: string, user: Object}} Session.
 */
export function assembleSession(resource) {
    return {
        token: resource.token,
        expiresAt: resource.expiresAt,
        user: {
            id: resource.id,
            email: resource.email,
            role: resource.role,
            workspace: WORKSPACE_BY_ROLE[resource.role] ?? null,
        },
    };
}
