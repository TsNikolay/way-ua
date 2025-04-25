import GoogleMapsAPI from "../utils/googleMaps.js";

class PlannerService {
  async getHotels(city, startDate, endDate) {
    const hotels = await GoogleMapsAPI.getHotels(city, startDate, endDate);
    return hotels;
  }
  async getAttractions(city, startDate, endDate) {
    const attractions = await GoogleMapsAPI.getAttractions(
      city,
      startDate,
      endDate,
    );
    return attractions;
  }
}

export default new PlannerService();
