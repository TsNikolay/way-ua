import RoutesService from "../services/route.service.js";
import { validationResult } from "express-validator";

class RouteController {
  async createRoute(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation failed:", errors.array());
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
      const userId = req.user.id;
      const routes = await RoutesService.getRoutes(userId);
      res.json({ routes });
    } catch (err) {
      return res.status(500).json({ message: "Failed to load routes" });
    }
  }

  async getRoute(req, res) {
    try {
      const routeId = req.params.id;
      const route = await RoutesService.getRouteById(routeId);
      res.json({ route });
    } catch (err) {
      return res.status(500).json({ message: "Failed to load route" });
    }
  }

  async deleteRoute(req, res) {
    try {
      const routeId = req.params.id;
      const userId = req.user.id;
      const deleted = await RoutesService.deleteRoute(userId, routeId);

      if (!deleted) {
        return res
          .status(404)
          .json({ message: "Route not found or not yours" });
      }

      res.json({ message: "Route deleted successfully" });
    } catch (err) {
      console.error("Error deleting route:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new RouteController();
