"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpf = void 0;
class Cpf {
    constructor() {
        this.ListReject = [
            "00000000000",
            "11111111111",
            "22222222222",
            "33333333333",
            "44444444444",
            "55555555555",
            "66666666666",
            "77777777777",
            "88888888888",
            "99999999999",
        ];
        this.STRICT_STRIP_REGEX = /[.-]/g;
        this.LOOSE_STRIP_REGEX = /[^\d]/g;
    }
    verifierDigit(numbers) {
        const numberList = numbers.split("").map(Number);
        const modulus = numberList.length + 1;
        const multiplied = numberList.map((number, index) => number * (modulus - index));
        const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
        return mod < 2 ? 0 : 11 - mod;
    }
    format(cpf) {
        const stripDigits = this.strip(cpf);
        const formatDigits = stripDigits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
        return formatDigits;
    }
    strip(cpf, isStrict = false) {
        const regex = isStrict ? this.STRICT_STRIP_REGEX : this.LOOSE_STRIP_REGEX;
        return (cpf || "").toString().replace(regex, "");
    }
    isValid(cpf, isStrict = false) {
        const stripped = this.strip(cpf, isStrict);
        // CPF must be defined
        if (!stripped) {
            return false;
        }
        // CPF must have 11 chars
        if (stripped.length !== 11) {
            return false;
        }
        if (this.ListReject.includes(stripped)) {
            return false;
        }
        let numbers = stripped.substring(0, 9);
        numbers += this.verifierDigit(numbers);
        numbers += this.verifierDigit(numbers);
        return numbers.substring(-2) === stripped.substring(-2);
    }
    getErrorMessage() {
        return "CPF is not valid";
    }
}
exports.Cpf = Cpf;
