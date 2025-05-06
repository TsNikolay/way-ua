import React, { useContext, useState } from "react";
import PlannerFormContext from "../../contexts/PlannerFormContext";

import { calculateTripDays, getTripDaysWeather } from "../../utils/datesUtils";
import styles from "./ReportPage.module.css";
import WeatherList from "../../components/WeatherList/WeatherList";
import { Link } from "react-router-dom";

const ReportPage = () => {
  const { weather, dates, city, selectedHotel } =
    useContext(PlannerFormContext);

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [tripTitle, setTripTitle] = useState("");
  const cityShortLabel = city.label.split(",").slice(0, 2).join(",");
  const startDate = new Date(dates[0]).toLocaleDateString();
  const endDate = new Date(dates[1]).toLocaleDateString();
  const numberOfTripsDays = calculateTripDays(dates);
  const tripDaysWeather = getTripDaysWeather(weather, dates);

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
              <span className={styles.infoValue}> {numberOfTripsDays}</span>
            </h2>

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
                    src={selectedHotel.imageUrl || "/images/default-hotel.png"}
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
                  src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${selectedHotel.place_id}`}
                ></iframe>
              </div>
            </div>
            <h2 className={styles.hotelTitle}>{selectedHotel.name}</h2>
            <h2 className={styles.hotelAddress}>{selectedHotel.address}</h2>
          </div>
        </div>
        <div className={styles.logo}>WAY.UA</div>
      </div>
    </div>
  );
};

export default ReportPage;
