import RoutesService from "../services/route.service.js";
import { validationResult } from "express-validator";

class RouteController {
  async createRoute(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const routeData = req.body;

      const result = await RoutesService.createRoute(userId, routeData);
      res.status(201).json({
        message: "Route created successfully",
        result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create route" });
    }
  }

  async getRoutes(req, res) {
    try {
    } catch (error) {}
  }
}

export default new RouteController();
