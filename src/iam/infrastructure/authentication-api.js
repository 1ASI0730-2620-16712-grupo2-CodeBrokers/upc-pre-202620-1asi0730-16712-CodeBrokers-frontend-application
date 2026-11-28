import { http } from "../../shared/infrastructure/http-client.js";
import { assembleSession } from "./authenticated-user.assembler.js";

/**
 * Error raised when the sign-in cannot be completed.
 *
 * @class AuthenticationError
 */
export class AuthenticationError extends Error {
    constructor(code) {
        super(code);
        this.code = code;
    }
}

/**
 * Signs in with email and password.
 *
 * @param {string} email - Account email.
 * @param {string} password - Account password.
 * @returns {Promise<{token: string, expiresAt: string, user: Object}>} Session.
 */
export async function signIn(email, password) {
    try {
        const response = await http.post("/authentication/sign-in", {
            email,
            password,
        });
        return assembleSession(response.data);
    } catch (error) {
        const code = {
            401: "INVALID_CREDENTIALS",
            403: "ACCOUNT_DISABLED",
            429: "TOO_MANY_ATTEMPTS",
        }[error.response?.status];
        throw new AuthenticationError(code ?? "UNAVAILABLE");
    }
}

/**
 * Signs out, revoking the current token in the backend.
 *
 * @returns {Promise<void>}
 */
export async function signOut() {
    await http.post("/authentication/sign-out");
}
