import api from "./axios";

export const hotelsRequest = async (city, language) => {
  return api.post("/planner/hotels", { city, language });
};

export const attractionsRequest = async (city, language) => {
  return api.post("/planner/attractions", {
    city,
    language,
  });
};

export const weatherRequest = async (latitude, longitude, language) => {
  return api.post("/planner/weather", {
    latitude,
    longitude,
    language,
  });
};

export const cityCoordinatesRequest = async (city) => {
  return api.post("/planner/coordinates", {
    city,
  });
};

export const tripPlanRequest = async (dataForPlan) => {
  return api.post("planner/generatePlan", {
    dataForPlan,
  });
};
