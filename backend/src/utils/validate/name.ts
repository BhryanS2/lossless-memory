type nameData = {
  firstName: string;
  lastName: string;
};

export class Name {
  isValid({ firstName, lastName }: nameData): boolean {
    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
      return false;
    }
    if (firstName.length < 2 || lastName.length < 2) {
      return false;
    }
    return true;
  }

  getFullName({ firstName, lastName }: nameData): string {
    return `${firstName} ${lastName}`;
  }

  getErrorMessage(): string {
    return "Name is not valid";
  }
}
