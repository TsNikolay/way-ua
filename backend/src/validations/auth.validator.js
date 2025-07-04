import { body } from "express-validator";

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail({ gmail_remove_dots: false })
    .trim(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .trim()
    .escape(),

  body("name")
    .isLength({ min: 5, max: 50 })
    .withMessage("Name must be between 5 and 50 characters")
    .trim()
    .escape()
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
    .withMessage("Name must contain only letters"),

  body("avatar_url")
    .optional()
    .isString()
    .withMessage("URL must be a valid URL"),
];
