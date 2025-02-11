import React, { createContext, useState, useEffect } from "react";
import { fetchAlunoComToken } from "../api/apiService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tenta realizar auto-login ao carregar o app
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const alunoData = await fetchAlunoComToken();
        setAluno(alunoData);
      } catch (error) {
        setAluno(null);
      } finally {
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ aluno, setAluno, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
