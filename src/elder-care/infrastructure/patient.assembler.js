import { Patient } from "../domain/patient.js";

/**
 * Converts API resources into Patient entities.
 *
 * @param {Object[]} resources - Patient resources.
 * @returns {Patient[]} Patient entities.
 */
export const assemblePatients = (resources) =>
    resources.map((r) => new Patient(r));
