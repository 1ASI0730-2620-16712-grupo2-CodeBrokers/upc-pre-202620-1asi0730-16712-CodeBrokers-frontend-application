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

