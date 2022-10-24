import { useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { useAuth } from "../hooks/useAuth";

import { Validate } from "../utils/validates";

import { Input } from "../components/form/input";

import simbolo from "../assets/icons/Simbolo.svg";
import logo from "../assets/icons/Logo.svg";

import style from "../styles/components/formPages.module.css";
import formStyle from "../styles/components/form/form.module.css";

interface FormProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export function ChangePassword() {
  document.title = "ChangePassword | lossless";
  const formRef = useRef<FormHandles>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { changePassword } = useAuth();

  const toValidate = async (data: FormProps) => {
    const validate = new Validate();
    setErrorMessage("");
    try {
      await validate.changePassword(data);
      return true;
    } catch (error: any) {
      setErrorMessage(error.message);
      return false;
    }
  };

  async function handleSubmit(data: FormProps) {
    const isValid = await toValidate(data);
    if (!isValid) return;
    setErrorMessage("");
    try {
      const response = await changePassword(data);
      if(!response.success) {
        setErrorMessage("Erro ao alterar a senha");
      }
      setErrorMessage("Senha alterada com sucesso");
    } catch (error) {
      setErrorMessage("Erro ao alterar a senha");
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
              <button type="submit">Alterar Senha</button>
            </Form>
          </section>
        </div>
      </main>
    </section>
  );
}
