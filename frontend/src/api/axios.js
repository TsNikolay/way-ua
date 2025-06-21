import axios from "axios";

export const API_URL = "http://localhost:5000/api/v1";

//Створюємо екземпляр аксіоса, він буде один на весь додаток, через нього шлемо запити
const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

//Перехоплювач, який ПЕРЕД відправкою будь-якого запиту додає до нього аксес токен
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// Перехоплювач, який оновить аксес токен рефреш токеном якщо при відповіді отримали Unauthorized
// та вже з токеном відправить запрос ще раз, або нічого не робитиме якщо все ок спочтаку
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    // Якщо помилка 401 і не пробували ще оновлювати токен
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("token", response.data.accessToken);
        return api.request(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // ❗ Видаляємо accessToken, якщо refresh також не вдався
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        // Можеш також зробити редірект на логін сторінку або викликати logout:
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
