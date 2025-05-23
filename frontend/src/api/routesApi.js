import api from "./axios";

export const createRouteRequest = async (data) => {
  return api.post("/routes", data);
};

export const getRoutesRequest = async () => {
  return api.get("/routes");
};

export const getRouteRequest = async (id) => {
  return api.get(`/routes/${id}`);
};

export const deleteRouteRequest = async (id) => {
  return api.delete(`/routes/${id}`);
};
