import { validationResult } from "express-validator";

import userModel from "../models/user.model.js";
import tokenService from "../services/token.service.js";
import authService from "../services/auth.service.js";

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, name, password, avatar_url } = req.body;
      const { user, tokens } = await authService.register({
        email,
        name,
        password,
        avatar_url,
      });

      //Зберігаємо рефреш токен в cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json({
        message: "User registered successfully",
        user,
        //...tokens,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Registration failed" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, tokens } = await authService.login({ email, password });

      //Зберігаємо рефреш токен в cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json({
        message: "Log in successfully",
        user: user,
        ...tokens,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Authorization failed" });
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await tokenService.remove(refreshToken);

      //Прибираємо рефреш токен з кукізів
      res.clearCookie("refreshToken");
      return res.json({ message: "User logged out", token });
    } catch (err) {}
  }

  async activateAccount(req, res) {
    try {
      const activationLink = req.params.link;
      await authService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      console.error(err);
      res.status(400).send("Activation failed");
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { tokens } = await authService.refresh(refreshToken);

      //Зберігаємо рефреш токен в cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({
        message: "Tokens refreshed successfully",
        //...tokens
      });
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: err.message || "Token refresh failed" });
    }
  }

  async getMe(req, res) {
    try {
      const userId = await req.user.id; // Бо req.user це не об`єкт, а проміс

      const user = await userModel.findUserById(userId);

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new AuthController();
