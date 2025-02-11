import React from "react";
import TreinoTile from "./TreinoTile";

const RotinaTile = ({ titulo, rotina }) => {
  return (
    <div
      style={{
        marginBottom: "16px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <h3>{titulo}</h3>
      <p>ID Personal: {rotina.idPersonal}</p>
      {rotina.treinos.map((treino, index) => (
        <TreinoTile key={index} treino={treino} />
      ))}
    </div>
  );
};

export default RotinaTile;
