//{
//   "name": "Trip to Kyiv",
//   "city": "Kyiv",
//   "start_date": "2025-07-01",
//   "end_date": "2025-07-07",
//   "hotel": {
//    "google_place_id": "ChIJkcO921PO1EAR3Fggzh18qnE",
//    "name": "Hilton Kyiv",
//     "address": "Tarasa Shevchenko Blvd, Kyiv",
//     "rating": 4.7,
//     "price": "$120",
//     "image_url": "https://example.com/hilton.jpg"
//   },
//   "weather_summary": "Sunny, ~25°C",
//   "plan_summary": "Day 1: Museum, Day 2: Lavra...",
//   "status": "planned",
//   "route_days": [
//    {
//     "google_place_id": "ChIJXzle44jO1EARNKSlXc90N8Y",
//     "name": "St. Sophia Cathedral",
//     "address": "Volodymyrska St, Kyiv",
//     "image_url": "...",
//     "description": "...",
//     "day_number": 1,
//     "time_slot": "morning",
//     "visit_order": 1,
//     "ticket_price": "200 UAH",
//     "rating": 4.8,
//     "notes": "Must-see historical place"
//   },
//   {
//      "google_place_id": "ChIJXzle44jO1EARNKSlXc90N8Y",
//      "name": "St. Sophia Cathedral",
//      "address": "Volodymyrska St, Kyiv",
//      "image_url": "...",
//      "description": "...",
//      "day_number": 1,
//      "time_slot": "morning",
//      "visit_order": 1,
//      "ticket_price": "200 UAH",
//      "rating": 4.8,
//      "notes": "Must-see historical place"
//    },
// ]
// }

import RouteModel from "../models/route.model.js";
import HotelModel from "../models/hotel.model.js";
import PlaceModel from "../models/place.model.js";
import RouteDayModel from "../models/routeDay.model.js";

class RouteService {
  async createRoute(userId, data) {
    const {
      name,
      city,
      start_date,
      end_date,
      hotel,
      weather_summary,
      plan_summary,
      status,
      route_days,
    } = data;

    //Перевіряємо чи вже є такий готель в базі данних. Якщо ні то створимо
    let hotel_id = await HotelModel.findByPlaceId(hotel.google_place_id);
    if (!hotel_id) {
      hotel_id = await HotelModel.create(hotel);
    }

    //Перевіряємо чи є вже в базі данних місця зазначені в route_days. Якщо ні то створимо
    for (const day of route_days) {
      let placeId = await PlaceModel.findByPlaceId(day.google_place_id);
      if (!placeId) {
        placeId = await PlaceModel.create(day);
      }
      day.place_id = placeId;
    }

    // 1. Створення маршруту
    const routeData = await RouteModel.create({
      userId,
      name,
      city,
      start_date,
      end_date,
      hotel_id,
      weather_summary,
      plan_summary,
      status,
    });

    // 2. Додавання днів
    if (Array.isArray(route_days) && route_days.length > 0) {
      await RouteDayModel.addRouteDays(routeData.id, route_days);
    } else {
      throw new Error("No route days provided");
    }

    return routeData;
  }

  async deleteRoute(userId, routeId) {
    const result = await RouteModel.delete(userId, routeId);

    return result.rowCount > 0; // перевірка чи видалився маршрут. Якщо видалилося більше 0 рядків то true
  }
}

export default new RouteService();
