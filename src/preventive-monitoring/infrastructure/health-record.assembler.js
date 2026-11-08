const TYPES = {
    HEART_RATE: { type: "heartRate", unit: "bpm" },
    BLOOD_PRESSURE: { type: "bloodPressure", unit: "mmHg" },
    GLUCOSE: { type: "glucose", unit: "mg/dL" },
    BODY_TEMPERATURE: { type: "bodyTemperature", unit: "°C" },
    WEIGHT: { type: "weight", unit: "kg" },
    FALL_DETECTED: { type: "fallDetected", unit: "" },
    MEDICATION_INTAKE: { type: "medicationIntake", unit: "" },
    GENERAL_NOTE: { type: "note", unit: "" },
};

const ORIGINS = {
    OLDER_ADULT: "olderAdult",
    FAMILY_CAREGIVER: "familyCaregiver",
    CARE_PROVIDER: "careProvider",
};

/**
 * Converts the health records returned by the API into the shape used by the history view.
 *
 * @param {string} patientId - Front-end patient identifier.
 * @param {Object[]} items - Records returned by the backend.
 * @returns {Object[]} Records ready for the history view.
 */
export function assembleHealthRecords(patientId, items) {
    return items.map((item) => {
        const known = TYPES[item.recordTypeCode];
        return {
            id: item.id,
            patientId,
            type: known?.type ?? "note",
            value: item.measurementValue ?? null,
            unit: known?.unit ?? "",
            recordedAt: item.recordedAt,
            origin: ORIGINS[item.source] ?? "olderAdult",
            note: null,
            noteText: item.note ?? null,
        };
    });
}
