import db from "../config/db.js";

class RouteModel {
  async create(routeData) {
    const { userId, name, city, start_date, end_date, hotel_id, status } =
      routeData;

    const result = await db.query(
      `INSERT INTO routes (user_id, name, city, start_date, end_date, hotel_id, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *;`,
      [userId, name, city, start_date, end_date, hotel_id, status],
    );

    return result.rows[0];
  }

  async findByUserId(userId) {
    const result = await db.query(
      `SELECT id,user_id,name,city,start_date,end_date,hotel_id,status,created_at
         FROM routes
         WHERE user_id = $1
         ORDER BY created_at DESC;`,
      [userId],
    );
    return result.rows;
  }

  async findById(routeId) {
    const result = await db.query(
      `SELECT id,user_id,name,city,start_date,end_date,hotel_id,status,created_at
         FROM routes
         WHERE id = $1
         ORDER BY created_at DESC;`,
      [routeId],
    );
    return result.rows;
  }

  async delete(userId, routeId) {
    const result = await db.query(
      `DELETE FROM routes WHERE user_id = $1 AND id = $2 RETURNING *`,
      [userId, routeId],
    );
    return result;
  }
}

export default new RouteModel();
