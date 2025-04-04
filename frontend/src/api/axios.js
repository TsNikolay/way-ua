import axios from "axios";

export const API_URL = "http://localhost:5000/";

//Створюємо екземпляр аксіоса, він буде один на весь додаток, через нього шлемо запити
const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

//Перехоплювач, який ПЕРЕД відправкою будь-якого запиту додає до нього аксес токен
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  return config;
});

export default api;
