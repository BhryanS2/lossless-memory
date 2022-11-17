import { useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { useAuth } from "../hooks/useAuth";

import { Validate } from "../utils/validates";

import { userToSend } from "../@types";

import { Input, InputCpf } from "../components/form/input";

import simbolo from "../assets/icons/Simbolo.svg";
import logo from "../assets/icons/Logo.svg";

import style from "../styles/components/formPages.module.css";
import formStyle from "../styles/components/form/form.module.css";

interface FormProps extends userToSend {
  confirmPassword: string;
}

export function Signup() {
  document.title = "Cadastro | lossless";
  const formRef = useRef<FormHandles>(null);
  const [cpfValue, setCpfValue] = useState("");
  const [password, setPassword] = useState("");
  const [passowrdActive, setPasswordActive] = useState(false);
  const [requirementsPassword, setRequirementsPassword] = useState({
    length: false,
    number: false,
    specialCharacter: false,
    upperCase: false,
    lowerCase: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { SignUp } = useAuth();

  const toValidate = async (data: FormProps) => {
    const validate = new Validate();
    setErrorMessage("");
    try {
      await validate.signup(data);
      return true;
    } catch (error: any) {
      setErrorMessage(error.message);
      return false;
    }
  };

  async function handleSubmit(data: FormProps) {
    const isValid = await toValidate(data);
    if (!isValid) return;
    try {
      await SignUp(data);
    } catch (error: any) {
      setErrorMessage("Usuário já existe");
    }
  }

  function validatePassword(password: string) {
    const errors = {
      length: false,
      number: false,
      specialCharacter: false,
      upperCase: false,
      lowerCase: false,
    };
    if (password.match(/[A-Z]/g)) errors.upperCase = true;
    if (password.match(/[a-z]/g)) errors.lowerCase = true;
    if (password.match(/\d/g)) errors.number = true;
    if (password.match(/[!@#$%^&*()_+?|[\]{};:><,'"]/g))
      errors.specialCharacter = true;
    if (password.length > 8) errors.length = true;
    setRequirementsPassword(errors);
    setPassword(password);
  }

  return (
    <section className={style.Container}>
      <div className={style.Image}>
        <img src={simbolo} alt="logo" />
      </div>
      <div
        className={style.goBack}
        onClick={() => {
          window.history.back();
        }}
      >
        <i className="arrow left"></i>
      </div>
      <main className={style.ContentContainer}>
        <div className={style.Content}>
          <section className={style.ContentSection}>
            <img src={logo} alt="logo" />
          </section>

          <section className={style.ContentMain}>
            <h1>Bem-vindo</h1>
            {errorMessage && (
              <div className={style.ErrorMessage}>
                <p>{errorMessage}</p>
                <div className={style.LineError}></div>
              </div>
            )}
            <Form
              className={formStyle.form}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <Input
                type="text"
                name="firstName"
                datavalue="Nome"
                required
                autoComplete="name"
              />
              <Input
                type="text"
                name="lastName"
                datavalue="Sobrenome"
                autoComplete="off"
                required
              />
              <Input
                type="email"
                name="email"
                datavalue="Email"
                required
                autoComplete="email"
              />
              <div className={style.password}>
                <Input
                  type="password"
                  name="password"
                  datavalue="Senha"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => validatePassword(e.target.value)}
                  onFocus={() => {
                    setPasswordActive(true);
                  }}
                  onBlur={() => {
                    setPasswordActive(false);
                  }}
                />
                <div
                  className={`${style.requirements} ${
                    passowrdActive ? style.active : ""
                  }`}
                >
                  <p>Senha deve conter:</p>
                  <ul>
                    <li
                      className={requirementsPassword.length ? style.valid : ""}
                    >
                      8 caracteres
                    </li>
                    <li
                      className={
                        requirementsPassword.upperCase ? style.valid : ""
                      }
                    >
                      1 letra maiúscula
                    </li>
                    <li
                      className={
                        requirementsPassword.lowerCase ? style.valid : ""
                      }
                    >
                      1 letra minúscula
                    </li>
                    <li
                      className={requirementsPassword.number ? style.valid : ""}
                    >
                      1 número
                    </li>
                    <li
                      className={
                        requirementsPassword.specialCharacter ? style.valid : ""
                      }
                    >
                      1 caracter especial
                    </li>
                  </ul>
                </div>
              </div>
              <Input
                type="password"
                name="confirmPassword"
                datavalue="Confirmar Senha"
                autoComplete="new-password"
                required
              />
              <Input
                type="date"
                name="birthday"
                datavalue="Data de nascimento"
                autoComplete="off"
                required
              />
              <InputCpf
                type="text"
                name="CPF"
                datavalue="CPF"
                required
                InputMaskChange={(e) => {
                  setCpfValue(e);
                }}
                value={cpfValue}
                maxLength={14}
                minLength={14}
              />
              <button type="submit">Cadastrar</button>
            </Form>
          </section>
        </div>
      </main>
    </section>
  );
}
