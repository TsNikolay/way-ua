import jwt from "jsonwebtoken";
import tokenModel from "../models/token.model.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

    return { accessToken, refreshToken };
  }

  async createOrUpdate(userId, refreshToken) {
    const tokenData = await tokenModel.findByUserId(userId);
    if (tokenData) {
      //Якщо юзер вже логінився і рефреш токен є та потребує оновлення
      const token = await tokenModel.update(userId, refreshToken); // Перезапис токена
      return token;
    }
    // Якщо юзер логіниться вперше або якщо рефреш токен вже пропав
    const token = await tokenModel.create(userId, refreshToken); // Створення нового токена
    return token;
  }

  async remove(refreshToken) {
    const token = await tokenModel.remove(refreshToken);
    return token;
  }

  async validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (err) {
      throw new Error("Invalid access token: " + err);
    }
  }

  async validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }
}

export default new TokenService();
