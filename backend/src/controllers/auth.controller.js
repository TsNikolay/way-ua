import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import * as uuid from "uuid";
import mailService from "../services/mail.service.js";
import tokenService from "../services/token.service.js";

class AuthController {
  async registerUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, name, password, avatar_url } = req.body;

      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      const activation_link = uuid.v4();
      const newUser = await UserModel.createUser(
        email,
        name,
        password_hash,
        avatar_url,
        activation_link,
      );

      await mailService.sendActivationEmail(email, activation_link);
      console.log(newUser);
      const tokens = tokenService.generateTokens({
        id: newUser.id,
        email,
        is_activated: newUser.is_activated,
      });
      //Зберігаємо або оновлюємо рефреш токен в базі даних
      await tokenService.createOrUpdateRefreshToken(
        newUser.id,
        tokens.refreshToken,
      );

      //Зберігаємо рефреш токен в cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
        ...tokens,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Registration failed" });
    }
  }

  async loginUser(req, res) {
    try {
      const { email } = req.body;

      const user = await UserModel.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password_hash,
      );

      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRES,
        },
      );

      res.status(201).json({
        message: "Log in successfully",
        user: user,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Authorization failed" });
    }
  }

  async logoutUser(req, res) {
    try {
    } catch (err) {}
  }
  async activateAccount(req, res) {
    try {
    } catch (err) {}
  }
  async refreshToken(req, res) {
    try {
    } catch (err) {}
  }

  async getMe(req, res) {
    try {
      const userId = req.user.id;
      console.log(userId);
      const user = await UserModel.findUserById(userId);

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new AuthController();
