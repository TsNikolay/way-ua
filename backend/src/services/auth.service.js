import bcrypt from "bcrypt";
import * as uuid from "uuid";
import userModel from "../models/user.model.js";
import mailService from "./mail.service.js";
import tokenService from "./token.service.js";
import tokenModel from "../models/token.model.js";
import ApiError from "../exceptions/ApiError..js";

class AuthService {
  async register({ email, name, password, avatar_url }) {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const activation_link = uuid.v4();
    const newUser = await userModel.createUser(
      email,
      name,
      password_hash,
      avatar_url,
      activation_link,
    );

    //Відправляємо юзеру лист з активацією
    await mailService.sendActivationEmail(
      email,
      `${process.env.API_URL}/auth/activate/${activation_link}`,
    );

    //Генеруємо токени
    const tokens = tokenService.generateTokens({
      id: newUser.id,
      email,
      is_activated: newUser.is_activated,
    });

    //Зберігаємо або оновлюємо рефреш токен в базі даних
    await tokenService.createOrUpdate(newUser.id, tokens.refreshToken);

    return { user: newUser, tokens };
  }

  async login({ email, password }) {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      throw ApiError.unauthorized("User does not exist");
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    //Генеруємо токени
    const tokens = tokenService.generateTokens({
      id: user.id,
      email,
      is_activated: user.is_activated,
    });

    //Зберігаємо або оновлюємо рефреш токен в базі даних
    await tokenService.createOrUpdate(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async activate(activationLink) {
    const user = await userModel.findUserByLink(activationLink);
    if (!user) {
      throw new Error("Invalid activation link");
    }

    await userModel.updateUser(user.id, { is_activated: true });
    return { user };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token is missing");
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);

    const tokenFromDB = await tokenModel.findToken(refreshToken);
    console.log(tokenFromDB);
    if (!userData || !tokenFromDB) {
      throw new Error("User is not authorized");
    }

    const user = await userModel.findUserById(userData.id);
    const tokens = tokenService.generateTokens({
      id: user.id,
      email: user.email,
      is_activated: user.is_activated,
    });

    await tokenService.createOrUpdate(user.id, tokens.refreshToken);

    return { user, tokens };
  }
}

export default new AuthService();
