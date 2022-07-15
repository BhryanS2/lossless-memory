export class Birthday {
  formatToSave(birthday: string): string {
    const formatBirthday = new Date(birthday);
    const formatBirthdayString = formatBirthday.toISOString();
    return formatBirthdayString;
  }

  toBrazilFormat(birthday: string): string {
    const formatBirthday = new Date(birthday);
    const formatToPatternBrazil = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(formatBirthday);
    return formatToPatternBrazil;
  }

  isValid(birthday: string): boolean {
    const actualDate = new Date();
    const birthdayDate = new Date(birthday);
    const age = actualDate.getFullYear() - birthdayDate.getFullYear();
    if (age > 0 && age < 150) {
      return true;
    }
    return false;
  }

  getErrorMessage(): string {
    return "Birthday is not valid";
  }
}
