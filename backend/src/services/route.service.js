import RouteModel from "../models/route.model.js";
import HotelModel from "../models/hotel.model.js";
import RouteDayModel from "../models/routeDay.model.js";
import AttractionModel from "../models/attraction.model.js";
import WeatherModel from "../models/weather.model.js";
import ActivityModel from "../models/activity.model.js";

class RouteService {
  async createRoute(userId, data) {
    const {
      name,
      city,
      start_date,
      end_date,
      hotel,
      weather,
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
      const itemData = day.item;
      const googlePlaceId = itemData.google_place_id;

      let item_id;
      let item_type;

      if (!googlePlaceId) {
        // Це AI-активність бо нема googlePlaceId
        const activity = await ActivityModel.create(itemData);
        item_id = activity.id;
        item_type = "activity";
      } else {
        // Це реальне місце, є googlePlaceId
        let attraction = await AttractionModel.findByPlaceId(googlePlaceId);
        if (!attraction) {
          attraction = await AttractionModel.create(itemData);
        }
        item_id = attraction.id;
        item_type = "attraction";
      }

      // Записуємо, щоб потім вставити в route_days
      day.item_id = item_id;
      day.item_type = item_type;
    }

    // 1. Створення маршруту
    const routeData = await RouteModel.create({
      userId,
      name,
      city,
      start_date,
      end_date,
      hotel_id,
      status,
    });

    // 2. Додавання днів
    if (Array.isArray(route_days) && route_days.length > 0) {
      await RouteDayModel.addRouteDays(routeData.id, route_days);
    } else {
      throw new Error("No route days provided");
    }

    for (const w of weather) {
      await WeatherModel.create({
        route_id: routeData.id,
        day: w.day,
        dt: w.dt,
        temperature: w.temperature,
        conditions: w.conditions,
      });
    }

    return routeData;
  }

  async getRoutes(userId) {
    // отримаємо всі маршрути
    const routes = await RouteModel.findByUserId(userId);

    // для кожного маршрута підтягуємо пов'язані дані
    const detailed = await Promise.all(
      routes.map(async (route) => {
        const [hotel, weather, days] = await Promise.all([
          HotelModel.findById(route.hotel_id),
          WeatherModel.findByRouteId(route.id),
          RouteDayModel.findByRouteId(route.id),
        ]);

        // для кожного дня підтягуємо пам'ятки
        const detailedDays = await Promise.all(
          days.map(async (day) => {
            let item = null;

            if (day.item_type === "attraction") {
              item = await AttractionModel.findById(day.item_id);
            } else if (day.item_type === "activity") {
              item = await ActivityModel.findById(day.item_id);
            }

            return { ...day, item };
          }),
        );

        return {
          ...route,
          hotel,
          weather,
          route_days: { days: detailedDays },
        };
      }),
    );

    return detailed;
  }

  async getRouteById(routeId) {
    try {
      const routeData = await RouteModel.findById(routeId);
      if (!routeData) {
        throw new Error("Route not found");
      }
      const route = routeData[0];

      const [hotel, weather, days] = await Promise.all([
        HotelModel.findById(route.hotel_id),
        WeatherModel.findByRouteId(route.id),
        RouteDayModel.findByRouteId(route.id),
      ]);

      const detailedDays = await Promise.all(
        days.map(async (day) => {
          let item = null;

          if (day.item_type === "attraction") {
            item = await AttractionModel.findById(day.item_id);
          } else if (day.item_type === "activity") {
            item = await ActivityModel.findById(day.item_id);
          }

          return { ...day, item };
        }),
      );

      return {
        ...route,
        hotel,
        weather,
        route_days: { days: detailedDays },
      };
    } catch (error) {
      console.error("Error fetching route:", error.message);
      throw new Error("Failed to get route");
    }
  }

  async deleteRoute(userId, routeId) {
    const route = await RouteModel.findById(routeId);

    if (!route || route[0].user_id !== userId) return false;

    await WeatherModel.deleteByRouteId(routeId);
    await RouteDayModel.deleteByRouteId(routeId);
    await RouteModel.delete(userId, routeId);

    return true;
  }
}

export default new RouteService();
