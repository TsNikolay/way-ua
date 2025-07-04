import api from "./axios";

export const loginRequest = async (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const registerRequest = async (email, password, name, avatar_url) => {
  return api.post("/auth/register", { email, password, name, avatar_url });
};

export const logoutRequest = async () => {
  return api.post("/auth/logout");
};

export const validateTokenRequest = async (token) => {
  return api.get("/auth/validate", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
};
