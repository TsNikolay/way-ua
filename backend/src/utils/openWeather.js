import axios from "axios";

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

const OpenWeatherAPI = {
  async getWeather(latitude, longitude, language) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          cnt: 16, // Максимум який АПІ може видати
          appid: API_KEY,
          units: "metric",
          lang: language,
        },
      },
    );

    return response.data;
  },
};
export default OpenWeatherAPI;
