import axios from "axios";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY_SERVER;

const GoogleMapsAPI = {
  async getHotels(city) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json`,
        {
          params: {
            query: `hotels in ${city.label}`, //раніше писав ще дати, але прибрав для ширшого пошуку
            location: `${city.coordinates.lat},${city.coordinates.lng}`,
            key: API_KEY,
          },
        },
      );

      return response.data.results
        .sort(
          (a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0),
        )
        .slice(0, 15)
        .map((hotel) => ({
          place_id: hotel.place_id,
          name: hotel.name,
          address: hotel.formatted_address,
          rating: hotel.rating,
          imageUrl: hotel.photos?.[0]
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${hotel.photos[0].photo_reference}&key=${API_KEY}`
            : null,
          attribution: hotel.photos?.[0]?.html_attributions?.[0] || null,
          user_ratings_total: hotel.user_ratings_total,
        }));
    } catch (error) {
      console.error("Hotels were not fetched:", error.message);
      throw error;
    }
  },

  async getAttractions(city) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json`,
        {
          params: {
            query: `tourist attractions in ${city.label}`,
            location: `${city.coordinates.lat},${city.coordinates.lng}`,
            key: API_KEY,
          },
        },
      );
      return response.data.results
        .sort(
          (a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0),
        )
        .map((attraction) => ({
          place_id: attraction.place_id,
          name: attraction.name,
          address: attraction.formatted_address,
          rating: attraction.rating,
          imageUrl: attraction.photos?.[0]
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${attraction.photos[0].photo_reference}&key=${API_KEY}`
            : null,
          attribution: attraction.photos?.[0]?.html_attributions?.[0] || null,
          user_ratings_total: attraction.user_ratings_total,
        }))
        .filter(
          (attraction) =>
            attraction.user_ratings_total >= 10 &&
            attraction.name.length > 3 &&
            attraction.address?.length > 10,
        ); //Щоб відсіяти "непотріб" у відповідях
    } catch (error) {
      console.error("Attractions were not fetched:", error.message);
      throw error;
    }
  },

  async getCoordinates(city) {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: city.label.trim(),
            key: API_KEY,
          },
        },
      );

      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } catch (err) {
      console.error("Geocoding failed:", err.message);
    }
  },
};

export default GoogleMapsAPI;
