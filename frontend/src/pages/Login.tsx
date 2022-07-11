import github from "../assets/icons/Github.svg";
import simbolo from "../assets/icons/Simbolo.svg";
import logo from "../assets/icons/Logo.svg";

import style from "../styles/components/Login.module.css";

export function Login() {
  return (
    <section className={style.ContainerLogin}>
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
            <div className={style.GitHubContainer}>
              <img src={github} alt="github-logo" />
              <p>Faça login com seu Github para começar</p>
            </div>
          </section>

          <button>Sign in</button>
        </div>
      </main>
    </section>
  );
}
