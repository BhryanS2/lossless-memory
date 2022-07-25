"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
class Name {
    isValid({ firstName, lastName }) {
        if (firstName.trim().length === 0 || lastName.trim().length === 0) {
            return false;
        }
        if (firstName.length < 2 || lastName.length < 2) {
            return false;
        }
        return true;
    }
    getFullName({ firstName, lastName }) {
        return `${firstName} ${lastName}`;
    }
    getErrorMessage() {
        return "Name is not valid";
    }
}
exports.Name = Name;
