import api from "./axios";

export const hotelsRequest = async (city, startDate, endDate) => {
  return api.get("/planner/hotels", { city, startDate, endDate });
};

export const attractionsRequest = async (city, startDate, endDate) => {
  return api.get("/planner/attractions", { city, startDate, endDate });
};
