import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";

import finishCicle from "../assets/icons/FinishedCicle.svg";

import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const {
    hasFinished,
    minutes,
    isActive,
    seconds,
    resetCountdown,
    startCountdown,
    timeTotal,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");
  const percentWidth = ((minutes * 60 + seconds) * 100) / timeTotal;
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
              <p>Abandonar ciclo</p>
              <div
                className={styles.line}
                style={{
                  width: percentWidth + "%",
                }}
              ></div>
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
