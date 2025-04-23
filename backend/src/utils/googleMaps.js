import axios from "axios";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const GoogleMapsAPI = {
  async getHotels(city) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: `hotels in ${city}`,
          key: API_KEY,
        },
      },
    );
    return response.data.results
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 10);
  },

  async getAttractions(city) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: `tourist attractions in ${city}`,
          key: API_KEY,
        },
      },
    );
    return response.data.results
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 15);
  },
};

export default GoogleMapsAPI;
