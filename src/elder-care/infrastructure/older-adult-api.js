import { http as api } from "../../shared/infrastructure/http-client.js";

/**
 * Reads the older adults (patients) from the backend.
 *
 * @returns {Promise<Object[]>} Older adult resources.
 */
export async function readOlderAdults() {
    const response = await api.get("/older-adults");
    return response.data;
}
