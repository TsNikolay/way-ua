import db from "../config/db.js";

class TokenModel {
  //Наступні команди відносяться до RefreshToken'у, якщо в майбутньому тут будуть оброблятися інші токени то методи мінять ім'я
  async findByUserId(userId) {
    const result = await db.query(`SELECT * FROM tokens WHERE user_id = $1;`, [
      userId,
    ]);
    return result.rows[0];
  }

  async findToken(refreshToken) {
    const result = await db.query(
      `SELECT * FROM tokens WHERE refresh_token = $1;`,
      [refreshToken],
    );
    return result.rows[0];
  }

  async update(userId, newRefreshToken) {
    const updated_at = new Date();
    const result = await db.query(
      `UPDATE tokens SET refresh_token = $1, created_at = $2 WHERE user_id = $3 RETURNING *;`,
      [newRefreshToken, updated_at, userId],
    );
    return result.rows[0];
  }

  async create(userId, refreshToken) {
    const created_at = new Date();
    const result = await db.query(
      `INSERT INTO tokens (user_id, refresh_token, created_at) 
             VALUES ($1, $2, $3) RETURNING *;`,
      [userId, refreshToken, created_at],
    );
    return result.rows[0];
  }

  async remove(refreshToken) {
    const result = await db.query(
      `DELETE FROM tokens WHERE refresh_token = $1 RETURNING *;`,
      [refreshToken],
    );
    return result.rows[0];
  }
}

export default new TokenModel();
