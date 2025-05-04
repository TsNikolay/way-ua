import PlannerService from "../services/planner.service.js";

class PlannerController {
  async getHotels(req, res) {
    try {
      const { city } = req.body;

      const result = await PlannerService.getHotels(city);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to get hotels" });
    }
  }

  async getAttractions(req, res) {
    try {
      const { city } = req.body;
      const result = await PlannerService.getAttractions(city);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to get attractions" });
    }
  }

  async getWeather(req, res) {
    try {
      const { latitude, longitude } = req.body;
      const result = await PlannerService.getWeather(latitude, longitude);

      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to get weather" });
    }
  }

  async getCoordinates(req, res) {
    try {
      const { city } = req.body;
      const result = await PlannerService.getCoordinates(city);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to get coordinates" });
    }
  }
}

export default new PlannerController();
