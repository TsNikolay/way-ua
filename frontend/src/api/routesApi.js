import api from "./axios";

export const createRouteRequest = async (data) => {
  return api.post("/routes", data);
};
