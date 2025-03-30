import Router from "express";
const router = new Router();
import AuthController from "../controllers/auth.controller.js";
import { registerValidator } from "../validations/auth.validator.js";
import { checkToken } from "../middlewares/authMiddleware.js";

router.post("/register", ...registerValidator, AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);
router.get("/activate/:link", AuthController.activateAccount);
router.get("/refresh/", AuthController.refreshToken);
router.get("/me", checkToken, AuthController.getMe);

export default router;
