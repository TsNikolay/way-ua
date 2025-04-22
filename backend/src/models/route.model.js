import db from "../config/db.js";

class RouteModel {
  async create(routeData) {
    const {
      userId,
      name,
      city,
      start_date,
      end_date,
      hotel_id,
      weather_summary,
      plan_summary,
      status,
    } = routeData;

    const result = await db.query(
      `INSERT INTO routes (user_id, name, city, start_date, end_date, hotel_id, weather_summary, plan_summary, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *;`,
      [
        userId,
        name,
        city,
        start_date,
        end_date,
        hotel_id,
        weather_summary,
        plan_summary,
        status,
      ],
    );

    return result.rows[0];
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
