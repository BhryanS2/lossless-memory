import * as bcrypt from "bcrypt";

export class Password {
  async format(password: string) {
    if (!password) return false;
    const buffer = 10;
    const salt = await bcrypt.genSalt(buffer);
    const PasswordHash = await bcrypt.hash(password, salt);

    return PasswordHash;
  }

  isValid(password: string) {
    const expected = {
      minLength: 8,
      maxLength: 16,
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasEspecialChar: true,
    };

    const passwordLength = password.length;
    const hasNumber = password.match(/\d/);
    const hasUpperCase = password.match(/[A-Z]/);
    const hasLowerCase = password.match(/[a-z]/);
    const hasEspecialChar = password.match(
      /[!@#$%&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    );

    const isValid = {
      minLength: passwordLength >= expected.minLength,
      maxLength: passwordLength <= expected.maxLength && passwordLength > 0,
      hasNumber: !!hasNumber,
      hasUpperCase: !!hasUpperCase,
      hasLowerCase: !!hasLowerCase,
      hasEspecialChar: !!hasEspecialChar,
    };

    return isValid;
  }

  async comparePasswords(password: string, passwordHash: string) {
    if (!password) return false;
    const isValid = await bcrypt.compare(password, passwordHash);
    return isValid;
  }

  getErrorsMessages() {
    const expected = {
      minLength: "Password must be at least 8 characters",
      maxLength: "Password must be at most 16 characters",
      hasNumber: "Password must contain at least one number",
      hasUpperCase: "Password must contain at least one uppercase letter",
      hasLowerCase: "Password must contain at least one lowercase letter",
      hasEspecialChar: "Password must contain at least one special character",
    };

    const errorsMessages = {
      minLength: expected.minLength,
      maxLength: expected.maxLength,
      hasNumber: expected.hasNumber,
      hasUpperCase: expected.hasUpperCase,
      hasLowerCase: expected.hasLowerCase,
      hasEspecialChar: expected.hasEspecialChar,
    };

    return errorsMessages;
  }
}
