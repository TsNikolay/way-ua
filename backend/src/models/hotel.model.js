import db from "../config/db.js";

class HotelModel {
  async findById(id) {
    const result = await db.query(
      `SELECT id, name, address, rating, google_place_id, attribution, photo_reference
         FROM hotels
        WHERE id = $1;`,
      [id],
    );
    return result.rows[0] || null;
  }

  async findByPlaceId(placeId) {
    const result = await db.query(
      `SELECT id FROM hotels WHERE google_place_id = $1`,
      [placeId],
    );
    return result.rows[0]?.id || null;
  }

  async create(hotelData) {
    const {
      google_place_id,
      name,
      address,
      rating,
      attribution,
      photo_reference,
    } = hotelData;

    const result = await db.query(
      `INSERT INTO hotels (google_place_id, name, address, rating, attribution, photo_reference) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
      [google_place_id, name, address, rating, attribution, photo_reference],
    );
    return result.rows[0].id;
  }
}

export default new HotelModel();
