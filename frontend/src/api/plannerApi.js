import api from "./axios";

export const hotelsRequest = async (city, startDate, endDate) => {
  return api.post("/planner/hotels", { city, startDate, endDate });
};

export const attractionsRequest = async (city, startDate, endDate) => {
  return api.post("/planner/attractions", {
    city,
    startDate,
    endDate,
  });
};
