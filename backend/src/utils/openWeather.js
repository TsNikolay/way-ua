import axios from "axios";

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

const OpenWeatherAPI = {
  async getWeather(latitude, longitude) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          cnt: 16, // Максимум який АПІ може видати
          appid: API_KEY,
          units: "metric",
        },
      },
    );

    return response.data;
  },
};
export default OpenWeatherAPI;

// return response.data.results
//     .sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0))
//     .slice(0, 15)
//     .map((hotel) => ({
//         place_id: hotel.place_id,
//         name: hotel.name,
//         address: hotel.formatted_address,
//         rating: hotel.rating,
//         imageUrl: hotel.photos?.[0]
//             ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${hotel.photos[0].photo_reference}&key=${API_KEY}`
//             : null,
//         attribution: hotel.photos?.[0]?.html_attributions?.[0] || null,
//         user_ratings_total: hotel.user_ratings_total,
//     }));
