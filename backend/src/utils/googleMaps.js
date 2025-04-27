import axios from "axios";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY_SERVER;

const GoogleMapsAPI = {
  async getHotels(city, startDate, endDate) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: `hotels in ${city} available from ${startDate} to ${endDate}`,
          key: API_KEY,
        },
      },
    );

    return response.data.results
      .sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0))
      .slice(0, 15)
      .map((hotel) => ({
        place_id: hotel.place_id,
        name: hotel.name,
        address: hotel.formatted_address,
        rating: hotel.rating,
        imageUrl: hotel.photos?.[0]
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${hotel.photos[0].photo_reference}&key=${API_KEY}`
          : null,
        attribution: hotel.photos?.[0]?.html_attributions?.[0] || null,
        user_ratings_total: hotel.user_ratings_total,
      }));
  },

  async getAttractions(city, startDate, endDate) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: `tourist attractions in ${city} available from ${startDate} to ${endDate}`,
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
