import React, { useState } from "react";
import TimerWidget from "./TimerWidget";

const TreinoTile = ({ treino }) => {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div style={{ marginBottom: "12px" }}>
      <h4>{treino.grupoMuscular}</h4>
      <p>{treino.observacoes || "Sem observações"}</p>
      {treino.exercicios.map((exercicio) => (
        <div
          key={exercicio.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <span>
            {exercicio.nome} - {exercicio.series}x{exercicio.repeticoes} •{" "}
            {exercicio.descanso}s descanso
          </span>
          <button onClick={() => setShowTimer(true)}>Timer</button>
          {showTimer && (
            <div>
              <TimerWidget durationInSeconds={exercicio.descanso} />
              <button onClick={() => setShowTimer(false)}>Fechar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TreinoTile;
