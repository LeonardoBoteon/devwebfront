import axios from "axios";

// IMPORTANTE: Substitua a porta pela porta da SUA API.
const API_URL = "http://localhost:5019/api/detalhesobra";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getDetalhePorObra = async (obraId) => {
  const response = await api.get(`/obra/${obraId}`);
  return response.data;
};

export const criarDetalhe = async (detalhe) => {
  const response = await api.post("/", detalhe);
  return response.data;
};

export const atualizarDetalhe = async (id, detalhe) => {
  const response = await api.put(`/${id}`, detalhe);
  return response.data;
};

export const deletarDetalhe = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
