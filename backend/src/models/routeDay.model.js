import db from "../config/db.js";

class RouteDayModel {
  async addRouteDays(routeId, routeDaysArray) {
    const sql = `
      INSERT INTO route_days (route_id, item_type, item_id, day_number, time_slot, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    for (const day of routeDaysArray) {
      const { day_number, time_slot, item_type, item_id, notes } = day;

      await db.query(sql, [
        routeId,
        item_type,
        item_id,
        day_number,
        time_slot,
        notes,
      ]);
    }
  }

  async findByRouteId(routeId) {
    const result = await db.query(
      `SELECT id, route_id, item_type, item_id, day_number, time_slot, notes
         FROM route_days
         WHERE route_id = $1
         ORDER BY day_number;`,
      [routeId],
    );
    return result.rows;
  }

  async deleteByRouteId(routeId) {
    await db.query(`DELETE FROM route_days WHERE route_id = $1`, [routeId]);
  }
}

export default new RouteDayModel();
