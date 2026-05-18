import axios from "axios";

const API_URL = "http://localhost:5019/api/artistas";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getArtistas = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getArtista = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const criarArtista = async (artista) => {
  const response = await api.post("/", artista);
  return response.data;
};

export const atualizarArtista = async (id, artista) => {
  const response = await api.put(`/${id}`, artista);
  return response.data;
};

export const deletarArtista = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
