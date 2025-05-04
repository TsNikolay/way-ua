import api from "./axios";

export const hotelsRequest = async (city) => {
  return api.post("/planner/hotels", { city });
};

export const attractionsRequest = async (city) => {
  return api.post("/planner/attractions", {
    city,
  });
};

export const weatherRequest = async (latitude, longitude) => {
  return api.post("/planner/weather", {
    latitude,
    longitude,
  });
};

export const cityCoordinatesRequest = async (city) => {
  return api.post("/planner/coordinates", {
    city,
  });
};
