import Router from "express";
const router = new Router();
import AuthController from "../controllers/auth.controller.js";
import { registerValidator } from "../validations/auth.validator.js";

router.post("/register", ...registerValidator, AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/activate/:link", AuthController.activateAccount);
router.get("/refresh", AuthController.refreshToken);
router.get("/validate", AuthController.validateToken);

export default router;
