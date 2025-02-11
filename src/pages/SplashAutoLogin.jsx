import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./SplashAutoLogin.css";

const SplashAutoLogin = () => {
  const { aluno } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (aluno) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [aluno, navigate]);

  return (
    <div className="splash-container">
      <p>Verificando autenticação...</p>
    </div>
  );
};

export default SplashAutoLogin;
