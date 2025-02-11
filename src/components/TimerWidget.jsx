import React, { useState, useEffect } from "react";

const TimerWidget = ({ durationInSeconds }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(durationInSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (running && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [running, remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeText = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{timeText}</h2>
      <div>
        <button onClick={() => setRunning(true)} style={{ marginRight: "8px" }}>
          Iniciar
        </button>
        <button onClick={() => setRunning(false)}>Parar</button>
      </div>
    </div>
  );
};

export default TimerWidget;
