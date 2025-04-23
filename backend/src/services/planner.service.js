import GoogleMapsAPI from "../utils/googleMaps.js";

class PlannerService {
  async getSuggestions(city) {
    const hotels = await GoogleMapsAPI.getHotels(city);
    const places = await GoogleMapsAPI.getAttractions(city);
    return { hotels, places };
  }
}

export default new PlannerService();
