import axios from "axios";
import { OLDER_ADULT_IDS } from "./older-adult-ids.js";
import { assembleHealthRecords } from "./health-record.assembler.js";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_BACKEND_API_BASE_URL ||
        "http://localhost:5270/api/v1",
    timeout: 5000,
});

/**
 * Reads the health records of one patient from the backend.
 *
 * @param {string} patientId - Front-end patient identifier.
 * @returns {Promise<Object[]|null>} Records, or null when the patient has no backend id.
 */
export async function readHealthRecords(patientId) {
    const guid = OLDER_ADULT_IDS[patientId];
    if (!guid) return null;
    const response = await api.get(`/older-adults/${guid}/health-records`);
    const items = Array.isArray(response.data)
        ? response.data
        : (response.data.items ?? []);
    return assembleHealthRecords(patientId, items);
}
