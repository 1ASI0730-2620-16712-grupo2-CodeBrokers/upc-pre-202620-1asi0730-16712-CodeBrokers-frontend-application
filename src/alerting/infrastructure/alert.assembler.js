import { Alert } from "../domain/alert.js";

/**
 * Converts API resources into Alert entities.
 *
 * @param {Object[]} resources - Alert resources.
 * @returns {Alert[]} Alert entities.
 */
export const assembleAlerts = (resources) => resources.map((r) => new Alert(r));
