import { body } from "express-validator";

export const RouteValidator = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Name can be at most 100 characters"),

  body("city")
    .exists()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string")
    .trim(),

  body("start_date")
    .exists()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid ISO8601 date"),

  body("end_date")
    .exists()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid ISO8601 date")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.start_date)) {
        throw new Error("End date must be equal to or after start date");
      }
      return true;
    }),

  body("created_at")
    .exists()
    .withMessage("Creation date is required")
    .isISO8601()
    .withMessage("Creation date must be a valid ISO8601 date"),

  body("status")
    .exists()
    .withMessage("Status is required")
    .isIn(["planned", "active", "completed"])
    .withMessage("Status must be one of: planned, active, completed"),

  // Hotel object
  body("hotel").exists().withMessage("Hotel object is required"),
  body("hotel.name")
    .exists()
    .withMessage("Hotel name is required")
    .isString()
    .withMessage("Hotel name must be a string")
    .trim(),
  body("hotel.address")
    .exists()
    .withMessage("Hotel address is required")
    .isString()
    .withMessage("Hotel address must be a string")
    .trim(),
  body("hotel.rating")
    .exists()
    .withMessage("Hotel rating is required")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Hotel rating must be a number between 0 and 5"),
  body("hotel.google_place_id")
    .exists()
    .withMessage("Hotel google_place_id is required")
    .isString()
    .withMessage("Hotel google_place_id must be a string")
    .trim(),
  body("hotel.attribution")
    .exists()
    .withMessage("Hotel attribution is required")
    .isString()
    .withMessage("Hotel attribution must be a string")
    .trim(),
  body("hotel.photo_reference")
    .exists()
    .withMessage("Hotel photo_reference is required")
    .isString()
    .withMessage("Hotel photo_reference must be a string")
    .trim(),

  // Weather array
  body("weather")
    .exists()
    .withMessage("Weather array is required")
    .isArray({ min: 1 })
    .withMessage("Weather must be a non-empty array"),
  body("weather.*.day")
    .exists()
    .withMessage("Weather day is required")
    .isInt({ min: 1 })
    .withMessage("Weather day must be an integer >= 1"),
  body("weather.*.temperature")
    .exists()
    .withMessage("Weather temperature is required")
    .isFloat()
    .withMessage("Weather temperature must be a number"),
  body("weather.*.conditions")
    .exists()
    .withMessage("Weather conditions is required")
    .isString()
    .withMessage("Weather conditions must be a string")
    .trim(),

  // Route days array
  body("route_days")
    .exists()
    .withMessage("route_days array is required")
    .isArray({ min: 1 })
    .withMessage("route_days must be a non-empty array"),
  body("route_days.*.day_number")
    .exists()
    .withMessage("Day number is required")
    .isInt({ min: 1 })
    .withMessage("Day number must be an integer >= 1"),
  body("route_days.*.time_slot")
    .exists()
    .withMessage("Time slot is required")
    .isIn(["morning", "afternoon", "evening", "night"])
    .withMessage(
      "Time slot must be one of: morning, afternoon, evening, night",
    ),
  body("route_days.*.notes")
    .exists()
    .withMessage("Notes are required")
    .isString()
    .withMessage("Notes must be a string")
    .trim(),
  // Attraction nested object
  body("route_days.*.item")
    .exists()
    .withMessage("Attraction/Activity object is required"),
  body("route_days.*.item.google_place_id")
    .exists()
    .withMessage("Attraction/Activity google_place_id is required")
    .isString()
    .withMessage("Attraction/Activity google_place_id must be a string")
    .trim(),
  body("route_days.*.item.name")
    .exists()
    .withMessage("Attraction/Activity name is required")
    .isString()
    .withMessage("Attraction/Activity name must be a string")
    .trim(),
  body("route_days.*.item.address")
    .exists()
    .withMessage("Attraction/Activity address is required")
    .isString()
    .withMessage("Attraction/Activity address must be a string")
    .trim(),
];
