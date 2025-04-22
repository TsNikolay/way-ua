import { body } from "express-validator";

export const routeValidator = [
  body("name").isString().notEmpty().withMessage("Route name is required"),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("start_date").isISO8601().withMessage("Start date must be valid"),
  body("end_date").isISO8601().withMessage("End date must be valid"),
  body("status")
    .optional()
    .isIn(["planned", "active", "completed"])
    .withMessage("Status must be planned, active, or completed"),

  body("hotel.google_place_id")
    .isString()
    .notEmpty()
    .withMessage("Hotel place ID is required"),
  body("hotel.name")
    .isString()
    .notEmpty()
    .withMessage("Hotel name is required"),
  body("hotel.address")
    .isString()
    .notEmpty()
    .withMessage("Hotel address is required"),
  body("hotel.rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Hotel rating must be between 0 and 5"),
  body("hotel.price").optional().isString(),
  body("hotel.image_url").optional().isString(),

  body("route_days")
    .isArray({ min: 1 })
    .withMessage("route_days must be a non-empty array"),

  body("route_days.*.google_place_id").isString().notEmpty(),
  body("route_days.*.name").isString().notEmpty(),
  body("route_days.*.address").isString().notEmpty(),
  body("route_days.*.image_url").optional().isString(),
  body("route_days.*.description").optional().isString(),
  body("route_days.*.day_number")
    .isInt({ min: 1 })
    .withMessage("day_number must be an integer greater than 0"),
  body("route_days.*.time_slot")
    .isIn(["morning", "afternoon", "evening"])
    .withMessage("time_slot must be morning, afternoon, or evening"),
  body("route_days.*.visit_order")
    .isInt({ min: 1 })
    .withMessage("visit_order must be an integer greater than 0"),
  body("route_days.*.ticket_price").optional().isString(),
  body("route_days.*.rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("rating must be between 0 and 5"),
  body("route_days.*.notes").optional().isString(),
];
