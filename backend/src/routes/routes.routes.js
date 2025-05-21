import Router from "express";
import RoutesController from "../controllers/route.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";
import { RouteValidator } from "../validations/route.validator.js";

const router = new Router();

router.post("/", checkToken, ...RouteValidator, RoutesController.createRoute);
router.get("/", checkToken, RoutesController.getRoutes);
router.get("/:id", checkToken, RoutesController.getRoute);
router.delete("/:id", checkToken, RoutesController.deleteRoute);

export default router;
