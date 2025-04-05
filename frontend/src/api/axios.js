import axios from "axios";

export const API_URL = "http://localhost:5000";

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

// Перехоплювач, який оновить аксес токен рефреш токеном якщо при відповіді отримали Unauthorized
// та вже з токеном відправить запрос ще раз, або нічого не робитиме якщо все ок спочтаку
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      //Перевірка щоб програма на зациклилась якщо буде завжди приходити 401 і ми не зможемо оновити токени
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return api.request(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
    throw error;
  },
);

export default api;
