import axios from "axios";

const API_URL = "http://localhost:5019/api/galerias";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getGalerias = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getGaleria = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const criarGaleria = async (galeria) => {
  const response = await api.post("/", galeria);
  return response.data;
};

export const atualizarGaleria = async (id, galeria) => {
  const response = await api.put(`/${id}`, galeria);
  return response.data;
};

export const deletarGaleria = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
