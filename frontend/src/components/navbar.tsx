import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import logoIcon from "../assets/icons/LogoIcon.svg";
import homeActive from "../assets/icons/home-active.svg";
import home from "../assets/icons/home.svg";
import rankActive from "../assets/icons/award-active.svg";
import rank from "../assets/icons/award.svg";
import adminActive from "../assets/icons/admin-active.svg";
import admin from "../assets/icons/admin.svg";

import { useAuth } from "../hooks/useAuth";

import style from "../styles/components/Nav.module.css";

type NavProps = {
  toPath: "/" | "/rank" | "/profile" | "/admin";
  children?: ReactNode;
};

export function Navbar({ toPath, children }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { SignOut, user } = useAuth();

  const isActive = (path: string) => {
    return toPath === path;
  };

  return (
    <React.Fragment>
      <div className={style.Body}>
        <nav>
          <div className={`${style.NavBar} ${isOpen ? style.active : ""}`}>
            <div>
              <img src={logoIcon} alt="logo" />
              <button className={style.close} onClick={toggle}>
                &times;
              </button>
            </div>

            <div className={style.NavContainer}>
              <Link to="/">
                <button
                  className={`${isActive("/") ? style.ActiveNav : ""} ${
                    style.buttons
                  }`}
                >
                  <img src={isActive("/") ? homeActive : home} alt="home" />
                </button>
              </Link>
              <Link to="/rank">
                <button
                  className={`
                    ${isActive("/rank") ? style.ActiveNav : ""}
                    ${style.buttons}
                  `}
                >
                  <img src={isActive("/rank") ? rankActive : rank} alt="rank" />
                </button>
              </Link>
              {process.env.REACT_APP_ADMIN_EMAIL === user?.email && (
                <Link to="/admin">
                  <button
                    className={`
                    ${isActive("/admin") ? style.ActiveNav : ""}
                    ${style.buttons}
                  `}
                  >
                    <img
                      src={isActive("/admin") ? adminActive : admin}
                      alt="admin"
                    />
                  </button>
                </Link>
              )}
            </div>

            <div>
              <button onClick={SignOut}>Sair</button>
            </div>
          </div>

          <div className={style.NavBarOff}>
            <button onClick={toggle}>
              {/* hamburguer  */}
              &#9776;
            </button>
          </div>
        </nav>
        {children}
      </div>
    </React.Fragment>
  );
}
