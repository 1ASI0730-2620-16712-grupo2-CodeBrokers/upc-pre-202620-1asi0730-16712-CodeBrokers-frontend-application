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
