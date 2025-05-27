import Router from "express";
import ContactsController from "../controllers/contacts.controller.js";
import { contactsValidator } from "../validations/contacts.validator.js";

const router = new Router();

router.post(
  "/sendFeedback",
  ...contactsValidator,
  ContactsController.sendFeedback,
);

export default router;
