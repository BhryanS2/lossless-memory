"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Birthday = void 0;
class Birthday {
    formatToSave(birthday) {
        const formatBirthday = new Date(birthday);
        const formatBirthdayString = formatBirthday.toISOString();
        return formatBirthdayString;
    }
    toBrazilFormat(birthday) {
        const formatBirthday = new Date(birthday);
        const formatToPatternBrazil = new Intl.DateTimeFormat("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(formatBirthday);
        return formatToPatternBrazil;
    }
    isValid(birthday) {
        const actualDate = new Date();
        const birthdayDate = new Date(birthday);
        const age = actualDate.getFullYear() - birthdayDate.getFullYear();
        if (age > 0 && age < 150) {
            return true;
        }
        return false;
    }
    getErrorMessage() {
        return "Birthday is not valid";
    }
}
exports.Birthday = Birthday;
