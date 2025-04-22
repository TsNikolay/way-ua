import db from "../config/db.js";

class HotelModel {
  async findByPlaceId(placeId) {
    const result = await db.query(
      `SELECT id FROM hotels WHERE google_place_id = $1`,
      [placeId],
    );
    return result.rows[0]?.id || null;
  }

  async create(hotelData) {
    const { google_place_id, name, address, rating, price, image_url } =
      hotelData;

    const result = await db.query(
      `INSERT INTO hotels (google_place_id, name, address, rating, price, image_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
      [google_place_id, name, address, rating, price, image_url],
    );
    return result.rows[0].id;
  }
}

export default new HotelModel();
