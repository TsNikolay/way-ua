import db from "../config/db.js";

class WeatherModel {
  async create({ route_id, day, dt, temperature, conditions }) {
    const result = await db.query(
      `INSERT INTO weather (route_id, day, dt, temperature, conditions) VALUES ($1, $2, $3, $4,$5) RETURNING *;`,
      [route_id, day, dt, temperature, conditions],
    );
    return result.rows[0];
  }

  async findByRouteId(routeId) {
    const result = await db.query(
      `SELECT id, route_id, day, dt, temperature, conditions FROM weather WHERE route_id = $1 ORDER BY day ASC;`,
      [routeId],
    );
    return result.rows;
  }

  async deleteByRouteId(routeId) {
    const result = await db.query(`DELETE FROM weather WHERE route_id = $1;`, [
      routeId,
    ]);
    return result.rowCount;
  }
}

export default new WeatherModel();
