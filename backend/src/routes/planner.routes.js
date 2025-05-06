import Router from "express";
import PlannerController from "../controllers/planner.controller.js";

const router = new Router();

router.post("/hotels", PlannerController.getHotels);
router.post("/attractions", PlannerController.getAttractions);
router.post("/weather", PlannerController.getWeather);
router.post("/coordinates", PlannerController.getCoordinates);
router.post("/generatePlan", PlannerController.generatePlan);

export default router;
