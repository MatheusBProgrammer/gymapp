import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Timer.css";

const Timer = () => {
  const { duration } = useParams();
  const initialDuration = parseInt(duration, 10);
  const [remainingSeconds, setRemainingSeconds] = useState(initialDuration);
  const [incentivo, setIncentivo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timerId);
        return 0;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (remainingSeconds === 10) {
      setIncentivo("Faltam só 10 segundos!");
    } else if (remainingSeconds === 5) {
      setIncentivo("Vamos voltar com tudo!");
    } else if (remainingSeconds === 0) {
      setIncentivo("Descanso finalizado! Manda ver!");
    } else {
      setIncentivo("");
    }
  }, [remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeText = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="timer-container">
      <div className="timer-content">
        <h1>{timeText}</h1>
        {incentivo && <h2>{incentivo}</h2>}
      </div>
      <button className="voltar-btn" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default Timer;
