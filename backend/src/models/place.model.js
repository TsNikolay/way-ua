import db from "../config/db.js";

class PlaceModel {
  async findByPlaceId(placeId) {
    const result = await db.query(
      `SELECT id FROM places WHERE google_place_id = $1`,
      [placeId],
    );
    return result.rows[0]?.id || null;
  }

  async create(placeData) {
    const {
      google_place_id,
      name,
      address,
      image_url,
      description,
      rating,
      ticket_price,
    } = placeData;

    const result = await db.query(
      `INSERT INTO places (google_place_id, name, address, image_url, description, rating, ticket_price)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
               RETURNING *`,
      [
        google_place_id,
        name,
        address,
        image_url,
        description,
        rating,
        ticket_price,
      ],
    );

    return result.rows[0].id;
  }
}

export default new PlaceModel();
