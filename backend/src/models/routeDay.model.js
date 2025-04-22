import db from "../config/db.js";

class RouteDayModel {
  async addRouteDays(routeId, routeDaysArray) {
    for (const day of routeDaysArray) {
      const {
        place_id,
        day_number,
        time_slot,
        visit_order,
        notes,
        ticket_price,
        rating,
      } = day;

      await db.query(
        `INSERT INTO route_days 
         (route_id, place_id, day_number, time_slot, visit_order, notes, ticket_price, rating)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          routeId,
          place_id,
          day_number,
          time_slot,
          visit_order,
          notes,
          ticket_price,
          rating,
        ],
      );
    }
  }
}

export default new RouteDayModel();
