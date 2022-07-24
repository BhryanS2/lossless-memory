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
  const formRef = useRef<FormHandles>(null);
  const [cpfValue, setCpfValue] = useState("");
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
              <Input
                type="password"
                name="password"
                datavalue="Senha"
                autoComplete="new-password"
                required
              />
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
