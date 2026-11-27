import axios from "axios";
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
 * @param {string} patientId - Older adult identifier (GUID) returned by the backend.
 * @returns {Promise<Object[]|null>} Records, or null when there is no patient id.
 */
export async function readHealthRecords(patientId) {
    if (!patientId) return null;
    const response = await api.get(`/older-adults/${patientId}/health-records`);
    const items = Array.isArray(response.data)
        ? response.data
        : (response.data.items ?? []);
    return assembleHealthRecords(patientId, items);
}
