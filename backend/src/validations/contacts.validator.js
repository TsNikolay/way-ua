import { body } from "express-validator";

export const contactsValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail({ gmail_remove_dots: false })
    .trim(),
];
