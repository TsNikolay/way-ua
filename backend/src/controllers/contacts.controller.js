import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError..js";
import mailService from "../services/mail.service.js";

class ContactsController {
  async sendFeedback(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstname, lastname, email, message } = req.body;

      await mailService.sendFeedback(firstname, lastname, email, message);

      res.status(200).json({
        message: "Feedback successfully sent",
      });
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message });
      }

      res.status(500).json({ message: "Failed to send feedback" });
    }
  }
}

export default new ContactsController();
