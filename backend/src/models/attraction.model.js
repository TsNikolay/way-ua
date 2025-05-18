import db from "../config/db.js";

class AttractionModel {
  async findByPlaceId(placeId) {
    const result = await db.query(
      `SELECT id FROM attractions WHERE google_place_id = $1`,
      [placeId],
    );
    return result.rows[0]?.id || null;
  }

  async create(placeData) {
    const { google_place_id, name, address, rating, photo_reference } =
      placeData;

    const result = await db.query(
      `INSERT INTO attractions ( google_place_id, name, address, rating, photo_reference) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [google_place_id, name, address, rating, photo_reference],
    );

    return result.rows[0].id;
  }
}

export default new AttractionModel();
