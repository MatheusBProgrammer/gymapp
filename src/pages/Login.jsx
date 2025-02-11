import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginAluno } from "../api/apiService";
import { SessionManager } from "../utils/sessionManager";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("aluno@aluno.com");
  const [senha, setSenha] = useState("12321Aluno!");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setAluno } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await loginAluno(email.trim(), senha.trim());
      const token = response.token;
      const alunoData = response.aluno;
      SessionManager.setToken(token);
      setAluno(alunoData);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Falha no login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login - Academia</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
