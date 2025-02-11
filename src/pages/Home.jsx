import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SessionManager } from "../utils/sessionManager";
import "./Home.css";

const Home = () => {
  const { aluno, setAluno } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!aluno) return null;

  const handleLogout = () => {
    SessionManager.clearToken();
    setAluno(null);
    navigate("/login");
  };

  const rotinas = aluno.rotinas || [];

  return (
    <div>
      <header className="home-header">
        <h2>Olá, {aluno.nome}</h2>
        <button onClick={handleLogout}>Sair</button>
      </header>
      <main className="home-main">
        <div className="rotinas-grid">
          {rotinas.map((rotina, index) => {
            const letra = String.fromCharCode(65 + index);
            const colors = [
              "#f44336",
              "#2196f3",
              "#4caf50",
              "#ff9800",
              "#9c27b0",
              "#e91e63",
              "#009688",
            ];
            const corItem = colors[index % colors.length];
            return (
              <div
                key={index}
                className="rotina-item"
                style={{ backgroundColor: corItem }}
                onClick={() => navigate(`/rotina/${index}`)}
              >
                {letra}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
