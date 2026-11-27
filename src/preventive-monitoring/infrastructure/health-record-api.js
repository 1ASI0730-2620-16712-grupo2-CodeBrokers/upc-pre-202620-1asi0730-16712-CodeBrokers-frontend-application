import { http as api } from "../../shared/infrastructure/http-client.js";
import { assembleHealthRecords } from "./health-record.assembler.js";

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
