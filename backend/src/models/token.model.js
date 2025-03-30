import db from "../config/db.js";

class TokenModel {
  async findByUserId(userId) {
    const result = await db.query(`SELECT * FROM tokens WHERE user_id = $1;`, [
      userId,
    ]);
    return result.rows[0];
  }

  //Наступні команди відносяться до RefreshToken'у, якщо в майбутньому тут будуть оброблятися інші токени то методи мінять ім'я
  async updateRefreshToken(userId, newRefreshToken) {
    const updated_at = new Date();
    const result = await db.query(
      `UPDATE tokens SET refresh_token = $1, created_at = $2 WHERE user_id = $3 RETURNING *;`,
      [newRefreshToken, updated_at, userId],
    );
    return result.rows[0];
  }

  async createRefreshToken(userId, refreshToken) {
    const created_at = new Date();
    const result = await db.query(
      `INSERT INTO tokens (user_id, refresh_token, created_at) 
             VALUES ($1, $2, $3) RETURNING *;`,
      [userId, refreshToken, created_at],
    );
    return result.rows[0];
  }
}

export default new TokenModel();
