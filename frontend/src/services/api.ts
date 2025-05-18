import axios from "axios";
const URL_BACK_END = import.meta.env.VITE_BACK_END_URL;

// Base da API
const api = axios.create({
  baseURL: URL_BACK_END, // Substitua pela sua URL real
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  get: (url: string) => api.get(url),
  post: (url: string, data: unknown) => api.post(url, data),
  put: (url: string, data: unknown) => api.put(url, data),
  delete: (url: string) => api.delete(url),
};
