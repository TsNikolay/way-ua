import Router from "express";
import PlannerController from "../controllers/planner.controller.js";

const router = new Router();

router.get("/suggestions", PlannerController.getSuggestions);

export default router;
