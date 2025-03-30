import db from "../config/db.js";

class UserModel {
  async createUser(email, name, password_hash, avatar_url, activation_link) {
    const timestamp = new Date(Date.now());
    const is_activated = false;

    const result = await db.query(
      `INSERT INTO users (email, name, password_hash, avatar_url, created_at, is_activated, activation_link) 
             VALUES ($1, $2, $3, $4, $5, $6 ,$7) RETURNING *;`,
      [
        email,
        name,
        password_hash,
        avatar_url,
        timestamp,
        is_activated,
        activation_link,
      ],
    );

    return result.rows[0];
  }

  async updateUser(userId, updateFields) {
    const fields = Object.keys(updateFields);
    const values = Object.values(updateFields);

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    // Формуємо частину запроса вигляду: "email = $1, name = $2, ..."
    const setQuery = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const result = await db.query(
      `UPDATE users SET ${setQuery} WHERE id = $${
        fields.length + 1
      } RETURNING *;`,
      [...values, userId],
    );

    return result.rows[0];
  }

  async findUserByEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    return result.rows[0];
  }

  async findUserByLink(activationLink) {
    const result = await db.query(
      `SELECT * FROM users WHERE activation_link = $1;`,
      [activationLink],
    );
    return result.rows[0];
  }

  async findUserById(id) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
    return result.rows[0];
  }
}

export default new UserModel();
