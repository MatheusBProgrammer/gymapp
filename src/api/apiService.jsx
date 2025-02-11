import axios from "axios";
import { SessionManager } from "../utils/sessionManager";

const baseUrl = "http://localhost:3000/api";

export const loginAluno = async (email, senha) => {
  const response = await axios.post(`${baseUrl}/aluno/login`, { email, senha });
  // Espera que a resposta retorne { token, aluno }
  return response.data;
};

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
