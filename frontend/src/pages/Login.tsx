import { useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { Input } from "../components/form/input";

import { Load } from "./Load";

import { userToLogin } from "../@types";

import simbolo from "../assets/icons/Simbolo.svg";
import logo from "../assets/icons/Logo.svg";

import style from "../styles/components/formPages.module.css";
import stylesForm from "../styles/components/form/form.module.css";

interface handleSubimitProps extends userToLogin {
  ConfirmPassword: string;
}

export function Login() {
  document.title = "Login | lossless";
  const formRef = useRef<FormHandles>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [load, setLoad] = useState(false);
  const { SignIn } = useAuth();

  async function handleSubmit(data: handleSubimitProps) {
    setErrorMessage("");
    try {
      setLoad(true);
      const json = await SignIn(data);
      if (!json.success) {
        setErrorMessage("Email e/ou senha incorretos");
      }
      setLoad(false);
    } catch (error: any) {
      setErrorMessage("Email e/ou senha incorretos");
      setLoad(false);
    }
  }

  if (load) {
    return <Load />;
  }

  return (
    <section className={style.Container}>
      <div className={style.Image}>
        <img src={simbolo} alt="logo" />
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
              ref={formRef}
              onSubmit={(e) => handleSubmit(e)}
              className={stylesForm.form}
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
                autoComplete="current-password"
                required
              />
              <button type="submit">Entrar</button>
            </Form>
          </section>

          <Link to="/signup" className={style.goOtherPage}>
            Cadastre-se
          </Link>

          <Link to="/change-password" className={style.goOtherPage}>
            Esqueci minha senha
          </Link>
        </div>
      </main>
    </section>
  );
}
