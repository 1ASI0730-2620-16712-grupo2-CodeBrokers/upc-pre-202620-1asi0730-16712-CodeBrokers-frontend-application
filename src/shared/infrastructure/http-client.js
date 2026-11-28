import axios from "axios";
import { readStoredSession } from "./session-storage.js";

/**
 * Shared HTTP client for the VitaLink backend.
 * Every request carries the access token of the signed-in user, when there is one.
 */
export const http = axios.create({
    baseURL:
        import.meta.env.VITE_BACKEND_API_BASE_URL ||
        "http://localhost:5270/api/v1",
    timeout: 5000,
});

http.interceptors.request.use((config) => {
    const token = readStoredSession()?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

let unauthorizedHandler = null;

/**
 * Registers what to do when the backend answers 401 to a request made with a session.
 *
 * @param {Function} handler - Called once per rejected request.
 */
export function onUnauthorized(handler) {
    unauthorizedHandler = handler;
}

http.interceptors.response.use(
    (response) => response,
    (error) => {
        // A failed sign-in also answers 401; that case is handled by the sign-in view.
        const isSignIn = error.config?.url?.includes("/authentication/sign-in");
        if (error.response?.status === 401 && !isSignIn) unauthorizedHandler?.();
        return Promise.reject(error);
    },
);
