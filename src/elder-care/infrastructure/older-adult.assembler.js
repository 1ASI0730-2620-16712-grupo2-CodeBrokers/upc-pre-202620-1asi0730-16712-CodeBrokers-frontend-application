const OUTDATED_AFTER_MS = 48 * 60 * 60 * 1000;

/**
 * Converts an older adult resource of the backend into the patient shape used by the views.
 *
 * @param {Object} resource - Older adult returned by the backend.
 * @param {Object[]} records - Health records of the older adult.
 * @param {Date} now - Reference date used to decide whether the last record is outdated.
 * @returns {Object} Patient resource.
 */
export function assembleOlderAdult(resource, records = [], now = new Date()) {
    const lastRecordAt =
        records
            .map((r) => r.recordedAt)
            .filter(Boolean)
            .sort()
            .at(-1) ?? null;
    return {
        id: resource.id,
        givenName: resource.firstName,
        familyName: resource.lastName,
        age: resource.age,
        location: [resource.district, resource.city].filter(Boolean).join(", "),
        providerId: resource.assignedProviderId,
        isMonitoringActive: resource.isMonitoringActive,
        lastRecordAt,
        // A patient is outdated when there is no record in the last 48 hours.
        outdated:
            !lastRecordAt ||
            now.getTime() - new Date(lastRecordAt).getTime() > OUTDATED_AFTER_MS,
    };
}
