import Router from "express";
import RoutesController from "../controllers/route.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";
import { routeValidator } from "../validations/route.validator.js";

const router = new Router();

router.post("/", checkToken, ...routeValidator, RoutesController.createRoute);
router.delete("/:id", checkToken, RoutesController.deleteRoute);

export default router;
