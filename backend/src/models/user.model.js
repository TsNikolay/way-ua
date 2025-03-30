import db from "../config/db.js";
import bcrypt from "bcrypt";

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

  async findUserByEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    return result.rows[0];
  }

  async findUserById(id) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
    return result.rows[0];
  }
}

export default new UserModel();
