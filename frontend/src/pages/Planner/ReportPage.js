import React, { useContext, useEffect, useState } from "react";
import PlannerFormContext from "../../contexts/PlannerFormContext";

import { calculateTripDays, getTripDaysWeather } from "../../utils/datesUtils";
import styles from "./ReportPage.module.css";
import WeatherList from "../../components/WeatherList/WeatherList";
import { Link, useNavigate } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import TripPlanList from "../../components/TripPlanList/TripPlanList";
import AuthContext from "../../contexts/AuthContext";

const ReportPage = () => {
  const { weather, dates, city, selectedHotel, tripPlan } =
    useContext(PlannerFormContext);
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tripTitle, setTripTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (tripPlan) {
      setLoading(false);
    }
  }, [tripPlan]);

  useEffect(() => {
    //Якщо даних не вистачає пересилаємо на початок форми
    if (!weather || dates.length === 0 || !city || !selectedHotel) {
      navigate("/planner/step1", { replace: true });
    }
  }, [weather, dates, city, selectedHotel]);

  if (!weather || dates.length === 0 || !city || !selectedHotel) {
    return null;
  }

  const cityShortLabel = city.label.split(",").slice(0, 2).join(",");
  const startDate = new Date(dates[0]).toLocaleDateString();
  const endDate = new Date(dates[1]).toLocaleDateString();
  const numberOfTripDays = calculateTripDays(dates);
  const tripDaysWeather = getTripDaysWeather(weather, dates);

  const handleStartOver = () => {
    navigate("/planner/step1", { state: { from: "/planner/report" } });
  };

  const handleLogin = async () => {
    navigate("/auth/login", { state: { from: "/planner/report" } });
  };

  const handleSaveTrip = async () => {
    //Логіка збереження
  };

  if (loading) {
    return (
      <div className={`${styles.container} ${styles.loadingContainer}`}>
        <h3 className={styles.loadingText}>🧭 Planning your adventure...</h3>
        <h3 className={styles.loadingText}>
          This will only take a few seconds!
        </h3>
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.title}>YOUR TRAVEL PLAN</h1>
      <div className={styles.container}>
        <div className={styles.tripInfoContainer}>
          <div className={styles.tripInfo}>
            <div className={styles.nameInputContainer}>
              <h2>Trip title</h2>
              <input
                type="text"
                placeholder="Enter trip name"
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
                className={styles.nameInput}
              />
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
              <WeatherList weatherDays={tripDaysWeather} type="short" />
            </div>
          </div>
          <div className={styles.hotelCard}>
            <div className={styles.hotelContent}>
              <div className={styles.hotelImageWrapper}>
                <Link
                  to={`https://www.google.com/maps/search/?api=1&query=${selectedHotel.name} ${selectedHotel.address}`}
                  target="_blank"
                >
                  <img
                    className={styles.hotelImage}
                    src={
                      `${API_URL}/planner/image?photo_reference=${selectedHotel.photo_reference}` ||
                      "/images/default-hotel.png"
                    }
                    alt={selectedHotel.name}
                    onError={(e) => {
                      e.target.src = "/images/default-hotel.png";
                    }}
                  />
                </Link>
              </div>
              <div className={styles.hotelMapWrapper}>
                <iframe
                  className={styles.hotelMap}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=place_id:${selectedHotel.place_id}`}
                ></iframe>
              </div>
            </div>
            <h2 className={styles.hotelTitle}>{selectedHotel.name}</h2>
            <h2 className={styles.hotelAddress}>{selectedHotel.address}</h2>
          </div>
        </div>
        <div className={styles.tripPlan}>
          <h2 className={styles.tripPlanTitle}>📝 Trip plan</h2>
          <TripPlanList trip={tripPlan} />
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => handleStartOver()}>
            Start over
          </button>
          {isAuth ? (
            <button className={styles.button} onClick={() => handleSaveTrip()}>
              Save the trip
            </button>
          ) : (
            <div>
              <button className={styles.button} onClick={() => handleLogin()}>
                Log in to save trip
              </button>
            </div>
          )}
        </div>
        <div className={styles.logo}>WAY.UA</div>
      </div>
    </div>
  );
};

export default ReportPage;
