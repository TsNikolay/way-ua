import Router from "express";
import PlannerController from "../controllers/planner.controller.js";

const router = new Router();

router.get("/hotels", PlannerController.getHotels);
router.get("/attractions", PlannerController.getAttractions);

export default router;
