/**
 * Patient entity within the Elder Care bounded context.
 *
 * @class Patient
 */
export class Patient {
    /**
     * @param {Object} resource - Patient attributes.
     */
    constructor(resource) {
        Object.assign(this, resource);
    }
    get fullName() {
        return `${this.givenName} ${this.familyName}`;
    }
    get initials() {
        return `${this.givenName[0]}${this.familyName[0]}`;
    }
}

/**
 * Filters and orders the assigned patient collection.
 *
 * @param {Patient[]} patients - Assigned patients.
 * @param {Object[]} alerts - Patient alerts.
 * @param {Object} filters - Search and status filters.
 * @returns {Patient[]} Matching patients.
 */
export function filterPatients(
    patients,
    alerts,
    { search = "", status = "ALL", outdated = false } = {},
) {
    const term = search.trim().toLocaleLowerCase();
    return patients
        .filter(
            (p) =>
                (!term ||
                    `${p.fullName} ${p.id}`
                        .toLocaleLowerCase()
                        .includes(term)) &&
                (!outdated || p.outdated) &&
                (status === "ALL" ||
                    alerts.some(
                        (a) => a.patientId === p.id && a.status === status,
                    )),
        )
        .sort(
            (a, b) =>
                a.familyName.localeCompare(b.familyName) ||
                a.givenName.localeCompare(b.givenName) ||
                a.id.localeCompare(b.id),
        );
}

