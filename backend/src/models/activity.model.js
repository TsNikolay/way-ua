import db from "../config/db.js";

class ActivityModel {
  async findById(id) {
    const result = await db.query(
      `SELECT id, name, address, category
         FROM activities
        WHERE id = $1;`,
      [id],
    );
    return result.rows[0] || null;
  }

  async create(activityData) {
    const { name, address, category } = activityData;

    const result = await db.query(
      `INSERT INTO activities (name, address, category) VALUES ($1, $2, $3) RETURNING *`,
      [name, address, category],
    );

    return result.rows[0];
  }
}

export default new ActivityModel();
