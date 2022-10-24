import * as Yup from "yup";
import { userToSend } from "../@types";

interface userToSignup extends userToSend {
  confirmPassword: string;
}

type ChangePasswordProps = {
  email: string;
  password: string;
  confirmPassword: string
}

export class Validate {
  async signup(signup: userToSignup) {
    await this.email(signup.email);
    await this.birthday(signup.birthday);
    await this.CPF(signup.CPF);
    await this.name(signup.firstName);
    await this.name(signup.lastName);
    this.password(signup.password);
    const confirmPassword =
      signup.password === signup.confirmPassword
        ? false
        : "As senhas não conferem";
    if (confirmPassword) throw new Error(confirmPassword);
  }

  async changePassword({email, password, confirmPassword}: ChangePasswordProps) {
    this.password(password);
    const confirmPasswordError =
      password === confirmPassword
        ? false
        : "As senhas não conferem";
    if (confirmPasswordError) throw new Error(confirmPasswordError);
    await this.email(email);
  }

  async email(email: string) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required("O email é obrigatório")
        .email("digite um email válidio")
        .trim("Apenas espaços não é permitido"),
    });

    return await schema.validate({ email });
  }

  password(password: string) {
    const errors = {
      upperCase: false,
      lowerCase: false,
      number: false,
      specialChar: false,
      length: false,
    };
    if (password.match(/[A-Z]/g)) errors.upperCase = true;
    if (password.match(/[a-z]/g)) errors.lowerCase = true;
    if (password.match(/\d/g)) errors.number = true;
    if (password.match(/[!@#$%^&*()_+?|[\]{};:><,'"]/g))
      errors.specialChar = true;
    if (password.length > 8) errors.length = true;
    const { upperCase, lowerCase, number, specialChar, length } = errors;
    const errorsMessage = {
      upperCase: upperCase
        ? false
        : "A senha deve conter pelo menos uma letra maiúscula",
      lowerCase: lowerCase
        ? false
        : "A senha deve conter pelo menos uma letra minúscula",
      number: number ? false : "A senha deve conter pelo menos um número",
      specialChar: specialChar
        ? false
        : "A senha deve conter pelo menos um caractere especial",
      length: length ? false : "A senha deve conter pelo menos 8 caracteres",
    };

    const messages = Object.values(errorsMessage).filter((e) => e !== false);
    if (messages.length > 0) {
      messages.forEach((message) => {
        throw new Error(String(message));
      });
    }
    return false;
  }

  async birthday(birthday: string) {
    const schema = Yup.object().shape({
      birthday: Yup.string()
        .required("A data de nascimento é obrigatória")
        .trim("Apenas espaços não é permitido"),
    });

    await schema.validate({ birthday });
    const date = new Date(birthday);
    const userMonth = date.getMonth() + 1;
    const userYear = date.getFullYear();
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    const age = todayYear - userYear;
    if (age > 150 || age < 0) throw new Error("Data de nascimento inválida");
    if (userYear === todayYear) {
      if (userMonth >= todayMonth) {
        throw new Error("Data de nascimento inválida");
      }
    }
    return false;
  }

  async CPF(CPF: string) {
    const REJECT_LIST = [
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

    const STRICT_STRIP_REGEX = /[.-]/g;
    const LOOSE_STRIP_REGEX = /[^\d]/g;
    function verifierDigit(numbers: string) {
      const numberList = numbers.split("").map(Number);

      const modulus = numberList.length + 1;

      const multiplied = numberList.map(
        (number, index) => number * (modulus - index)
      );

      const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;

      return mod < 2 ? 0 : 11 - mod;
    }

    function strip(cpf: string, isStrict = false) {
      const regex = isStrict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
      return (cpf || "").toString().replace(regex, "");
    }

    function isValid(cpf: string, isStrict: boolean = false) {
      const stripped = strip(cpf, isStrict);

      if (!stripped) {
        return false;
      }

      if (stripped.length !== 11) {
        return false;
      }

      if (REJECT_LIST.includes(stripped)) {
        return false;
      }

      let numbers = stripped.substring(0, 9);
      numbers += verifierDigit(numbers);
      numbers += verifierDigit(numbers);

      return numbers.substring(-2) === stripped.substring(-2);
    }

    const isValidCPF = isValid(CPF);
    if (!isValidCPF) throw new Error("CPF inválido");
    return false;
  }

  async name(name: string) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required("O nome é obrigatório")
        .trim("Apenas espaços não é permitido")
        .min(3, "O nome deve conter pelo menos 3 caracteres")
        .max(50, "O nome deve conter no máximo 50 caracteres"),
    });

    return await schema.validate({ name });
  }
}
