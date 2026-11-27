import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_BACKEND_API_BASE_URL ||
        "http://localhost:5270/api/v1",
    timeout: 5000,
});

/**
 * Reads the older adults (patients) from the backend.
 *
 * @returns {Promise<Object[]>} Older adult resources.
 */
export async function readOlderAdults() {
    const response = await api.get("/older-adults");
    return response.data;
}
