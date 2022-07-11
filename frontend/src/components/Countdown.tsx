// style
import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";

import finishCicle from "../assets/icons/FinishedCicle.svg";

import styles from "../styles/components/Countdown.module.css";

// jornada infinita
export function Countdown() {
  const {
    hasFinished,
    minutes,
    isActive,
    seconds,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  // O podStart serve para verificar se o número tem dois algarismo, se não tiver ele coloca um 0
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <img src={finishCicle} alt="Fim de ciclo" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton}  ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.countdownButton}`}
              onClick={startCountdown}
            >
              Inicionar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
