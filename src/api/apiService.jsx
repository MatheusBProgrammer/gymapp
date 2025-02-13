import axios from "axios";
import { SessionManager } from "../utils/sessionManager";

// Ajuste a baseUrl para o seu backend
const baseUrl = "https://backend-gym-chi.vercel.app/api";

// Login do aluno
export const loginAluno = async (email, senha) => {
  const response = await axios.post(`${baseUrl}/aluno/login`, { email, senha });
  // Espera que a resposta retorne { token, aluno }
  return response.data;
};

// Busca os dados do aluno já logado (via token)
export const fetchAlunoComToken = async () => {
  const token = SessionManager.getToken();
  if (!token) throw new Error("Token não encontrado.");
  const response = await axios.get(`${baseUrl}/aluno/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Retorna os dados do aluno
};
