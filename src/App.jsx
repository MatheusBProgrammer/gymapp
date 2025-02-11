import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SplashAutoLogin from "./pages/SplashAutoLogin";
import RotinaDetail from "./pages/RotinaDetail";
import Timer from "./pages/Timer";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { aluno, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Carregando...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/splash" element={<SplashAutoLogin />} />
        <Route
          path="/home"
          element={aluno ? <Home /> : <Navigate to="/login" />}
        />
        {/* Usamos o índice da rotina (A, B, etc.) como parâmetro */}
        <Route
          path="/rotina/:index"
          element={aluno ? <RotinaDetail /> : <Navigate to="/login" />}
        />
        <Route path="/timer/:duration" element={<Timer />} />
        <Route
          path="*"
          element={<Navigate to={aluno ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
