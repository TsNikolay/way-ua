import React, { useEffect, useState } from "react";
import { getRouteRequest } from "../../api/routesApi";
import styles from "./RoutePage.module.css";
import WeatherList from "../../components/WeatherList/WeatherList";
import { Link, useParams } from "react-router-dom";
import TripPlanList from "../../components/TripPlanList/TripPlanList";
import { calculateTripDays, getTripDaysWeather } from "../../utils/datesUtils";
import WeatherMapper from "../../mappers/weather.mapper";
import RouteDayMapper from "../../mappers/routeDay.mapper";

const RoutePage = () => {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setLoading(true); // Начало загрузки
        const response = await getRouteRequest(id);

        if (response && response.data) {
          setRoute(response.data.route);
          console.log("[RoutePage] Маршрут загружен:", response.data);
        } else {
          throw new Error("Маршрут не найден");
        }
      } catch (err) {
        console.error("[RoutePage] Ошибка загрузки маршрута:", err.message);
        setError("Не удалось загрузить маршрут");
      } finally {
        setLoading(false); // Конец загрузки
      }
    };

    fetchRoute();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Загрузка маршрута...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!route) {
    return (
      <div className={styles.error}>
        <h2>Маршрут не найден</h2>
      </div>
    );
  }

  const cityShortLabel = route.city.split(",").slice(0, 2).join(",");
  const startDate = new Date(route.start_date).toLocaleDateString();
  const endDate = new Date(route.end_date).toLocaleDateString();
  const numberOfTripDays = calculateTripDays([
    route.start_date,
    route.end_date,
  ]);
  const weatherDaysView = route.weather.map((weatherDayDb) =>
    WeatherMapper.dbToViewModel(weatherDayDb),
  );

  const tripWeatherDaysView = getTripDaysWeather(weatherDaysView, [
    route.start_date,
    route.end_date,
  ]);

  const tripPlanView = {
    days: [],
  };

  if (route.route_days?.days?.length > 0) {
    const groupedByDay = new Map();

    route.route_days.days.forEach((entry) => {
      const activity = RouteDayMapper.dbToView(entry);
      const dayNumber = entry.day_number;

      if (!groupedByDay.has(dayNumber)) {
        groupedByDay.set(dayNumber, []);
      }

      groupedByDay.get(dayNumber).push(activity);
    });

    tripPlanView.days = Array.from(groupedByDay.entries())
      .sort(([a], [b]) => a - b)
      .map(([day_number, activities]) => ({
        day_number,
        activities,
      }));
  }
  console.log(tripPlanView);

  return (
    <div>
      <h1 className={styles.title}>YOUR TRAVEL PLAN</h1>
      <div className={styles.container}>
        <div className={styles.tripInfoContainer}>
          <div className={styles.tripInfo}>
            <div className={styles.nameInputContainer}>
              <h2>Trip title {route.name}</h2>
            </div>
            <div className={styles.infoValueContainer}>
              <h2>
                🗺️ City:{" "}
                <span className={styles.infoValue}>{cityShortLabel}</span>
              </h2>
              <h2>
                📅 Dates:{" "}
                <span className={styles.infoValue}>
                  {startDate} - {endDate}
                </span>
              </h2>
              <h2>
                #️⃣ Days:{" "}
                <span className={styles.infoValue}> {numberOfTripDays}</span>
              </h2>
            </div>
            <div className={styles.tripWeather}>
              <h2>⛅ Weather: </h2>
              <WeatherList weatherDays={tripWeatherDaysView} type="short" />
            </div>
          </div>
          <div className={styles.hotelCard}>
            <div className={styles.hotelContent}>
              <div className={styles.hotelImageWrapper}>
                <Link
                  to={`https://www.google.com/maps/search/?api=1&query=${route.hotel.name} ${route.hotel.address}`}
                  target="_blank"
                >
                  <img
                    className={styles.hotelImage}
                    src={
                      `${API_URL}/planner/image?photo_reference=${route.hotel.photo_reference}` ||
                      "/images/default-hotel.png"
                    }
                    alt={route.hotel.name}
                    onError={(e) => {
                      e.target.src = "/images/default-hotel.png";
                    }}
                  />
                </Link>
              </div>
              <div className={styles.hotelMapWrapper}>
                {/*<iframe*/}
                {/*  className={styles.hotelMap}*/}
                {/*  allowFullScreen*/}
                {/*  referrerPolicy="no-referrer-when-downgrade"*/}
                {/*  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=place_id:${route.hotel.google_place_id}`}*/}
                {/*></iframe>*/}
              </div>
            </div>
            <h2 className={styles.hotelTitle}>{route.hotel.name}</h2>
            <h2 className={styles.hotelAddress}>{route.hotel.address}</h2>
          </div>
        </div>
        <div className={styles.tripPlan}>
          <h2 className={styles.tripPlanTitle}>📝 Trip plan</h2>
          <TripPlanList trip={tripPlanView} />
        </div>
        <div className={styles.logo}>WAY.UA</div>
      </div>
    </div>
  );
};

export default RoutePage;
