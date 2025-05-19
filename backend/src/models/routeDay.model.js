import db from "../config/db.js";

class RouteDayModel {
  async addRouteDays(routeId, routeDaysArray) {
    const sql = `
      INSERT INTO route_days (route_id, attraction_id, day_number, time_slot, notes)
      VALUES ($1,$2,$3,$4,$5)
    `;

    for (const day of routeDaysArray) {
      const {
        day_number,
        notes,
        time_slot,
        attraction_id, // ← тут PK
      } = day;

      await db.query(sql, [
        routeId,
        attraction_id,
        day_number,
        time_slot,
        notes,
      ]);
    }
  }

  async findByRouteId(routeId) {
    const result = await db.query(
      `SELECT id, route_id, attraction_id, day_number, time_slot, notes
         FROM route_days
        WHERE route_id = $1
        ORDER BY day_number;`,
      [routeId],
    );
    return result.rows;
  }
}

export default new RouteDayModel();
