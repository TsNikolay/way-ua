import GoogleMapsAPI from "../utils/googleMaps.js";
import OpenWeatherAPI from "../utils/openWeather.js";
import OpenAIAPI from "../utils/openAI.js";

class PlannerService {
  async getHotels(city, language) {
    const hotels = await GoogleMapsAPI.getHotels(city, language);
    return hotels;
  }
  async getAttractions(city, language) {
    const attractions = await GoogleMapsAPI.getAttractions(city, language);
    return attractions;
  }

  async getWeather(latitude, longitude, language) {
    const weather = await OpenWeatherAPI.getWeather(
      latitude,
      longitude,
      language,
    );
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

  async getImage(photo_reference) {
    const image = await GoogleMapsAPI.getImage(photo_reference);
    return image;
  }
}

export default new PlannerService();
