import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import logoIcon from "../assets/icons/LogoIcon.svg";
import homeActive from "../assets/icons/home-active.svg";
import home from "../assets/icons/home.svg";
import rankActive from "../assets/icons/award-active.svg";
import rank from "../assets/icons/award.svg";

import { useAuth } from "../hooks/useAuth";

import style from "../styles/components/Nav.module.css";

type NavProps = {
  isHome: boolean;
  isRank: boolean;
  children?: ReactNode;
};

export function Navbar({ isHome, isRank, children }: NavProps) {
  // const activeAwerd = isRank;
  const activeHome = isHome;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { SignOut } = useAuth();

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
              {activeHome ? (
                <button className={`${style.ActiveNav} ${style.buttons}`}>
                  <Link to="/">
                    <img src={homeActive} alt="home" />
                  </Link>
                </button>
              ) : (
                <button className={style.buttons}>
                  <Link to="/">
                    <img src={home} alt="home" />
                  </Link>
                </button>
              )}
              {isRank ? (
                <button className={`${style.ActiveNav} ${style.buttons}`}>
                  <Link to="/rank">
                    <img src={rankActive} alt="home" />
                  </Link>
                </button>
              ) : (
                <button className={style.buttons}>
                  <Link to="/rank">
                    <img src={rank} alt="home" />
                  </Link>
                </button>
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
