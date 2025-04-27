import Router from "express";
import PlannerController from "../controllers/planner.controller.js";

const router = new Router();

router.post("/hotels", PlannerController.getHotels);
router.post("/attractions", PlannerController.getAttractions);

export default router;
