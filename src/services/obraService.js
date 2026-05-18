import axios from "axios";

const API_URL = "http://localhost:5019/api/obras";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getObras = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getObra = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const criarObra = async (obra) => {
  const response = await api.post("/", obra);
  return response.data;
};

export const atualizarObra = async (id, obra) => {
  const response = await api.put(`/${id}`, obra);
  return response.data;
};

export const deletarObra = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
