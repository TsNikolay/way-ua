import PlannerService from "../services/planner.service.js";

class PlannerController {
  async getHotels(req, res) {
    try {
      const { city, startDate, endDate } = req.body;

      const result = await PlannerService.getHotels(city, startDate, endDate);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to get hotels" });
    }
  }

  async getAttractions(req, res) {
    try {
      const { city, startDate, endDate } = req.body;

      const result = await PlannerService.getAttractions(
        city,
        startDate,
        endDate,
      );
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to get attractions" });
    }
  }
}

export default new PlannerController();
