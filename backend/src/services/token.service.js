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

  async createOrUpdateRefreshToken(userId, refreshToken) {
    const tokenData = await tokenModel.findByUserId(userId);
    if (tokenData) {
      //Якщо юзер вже логінився
      const token = await tokenModel.updateRefreshToken(userId, refreshToken); // Перезапис токена
      return token;
    }
    // Якщо юзер логіниться вперше
    const token = await tokenModel.createRefreshToken(userId, refreshToken); // Створення нового токена
    return token;
  }
}

export default new TokenService();
