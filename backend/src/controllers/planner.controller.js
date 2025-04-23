import PlannerService from "../services/planner.service.js";

class PlannerController {
  async getSuggestions(req, res) {
    try {
      const { city } = req.body;
      const result = await PlannerService.getSuggestions(city);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to get suggestions" });
    }
  }
}

export default new PlannerController();
