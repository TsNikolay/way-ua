import GoogleMapsAPI from "../utils/googleMaps.js";
import OpenWeatherAPI from "../utils/openWeather.js";
import OpenAIAPI from "../utils/openAI.js";

class PlannerService {
  async getHotels(city) {
    const hotels = await GoogleMapsAPI.getHotels(city);
    return hotels;
  }
  async getAttractions(city) {
    const attractions = await GoogleMapsAPI.getAttractions(city);
    return attractions;
  }

  async getWeather(latitude, longitude) {
    const weather = await OpenWeatherAPI.getWeather(latitude, longitude);
    return weather;
  }

  async getCoordinates(city) {
    const coordinates = await GoogleMapsAPI.getCoordinates(city);

    return coordinates;
  }

  async generatePlan(dataForPlan) {
    const plan = await OpenAIAPI.generatePlan(dataForPlan);
    return plan;
  }
}

export default new PlannerService();
