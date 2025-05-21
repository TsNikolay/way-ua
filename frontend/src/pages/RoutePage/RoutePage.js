import React, { useEffect, useState } from "react";
import { getRouteRequest } from "../../api/routesApi";
import styles from "./RoutePage.module.css";
import WeatherList from "../../components/WeatherList/WeatherList";
import { Link, useParams } from "react-router-dom";
import TripPlanList from "../../components/TripPlanList/TripPlanList";
import { calculateTripDays, getTripDaysWeather } from "../../utils/datesUtils";

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

  return (
    <div>
      <div className={styles.container}></div>
    </div>
  );
};

export default RoutePage;
