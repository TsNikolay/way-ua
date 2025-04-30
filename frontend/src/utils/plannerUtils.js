import { cityCoordinatesRequest } from "../api/plannerApi";

export function countTripDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

export async function getCityCoordinates(city) {
  const response = await cityCoordinatesRequest(city);
  return response.data;
}
