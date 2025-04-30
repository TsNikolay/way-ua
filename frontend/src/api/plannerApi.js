import api from "./axios";

export const hotelsRequest = async (city) => {
  return api.post("/planner/hotels", { city });
};

export const attractionsRequest = async (city) => {
  return api.post("/planner/attractions", {
    city,
  });
};

export const weatherRequest = async (latitude, longitude, numberOfDays) => {
  return api.post("/planner/weather", {
    latitude,
    longitude,
    numberOfDays,
  });
};

export const cityCoordinatesRequest = async (city) => {
  const result = await api.post("/planner/coordinates", {
    city,
  });

  return result;
};
