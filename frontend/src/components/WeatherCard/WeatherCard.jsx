import React from "react";
import { getDayAndMonth, getWeekday } from "../../utils/datesUtils";
import styles from "./WeatherCard.module.css";

const WeatherCard = ({ weatherDay, type = "full", empty = false }) => {
  //Якщо нема погоди на цей день
  if (empty || !weatherDay) {
    if (type === "full") {
      return (
        <div className={`${styles.card} ${styles.empty}`}>
          <h2>No weather data yet</h2>
        </div>
      );
    } else {
      return (
        <div className={`${styles.shortCard} ${styles.empty}`}>
          <h2>?</h2>
        </div>
      );
    }
  }

  const weekday = getWeekday(weatherDay.dt * 1000);
  const date = getDayAndMonth(weatherDay.dt * 1000);
  const shortedTemperature = String(weatherDay.temp.day).split(".")[0] + "°C";
  const icon = weatherDay.weather[0].icon;
  const main = weatherDay.weather[0].main;
  const description = weatherDay.weather[0].description;

  return (
    <div className={type === "full" ? styles.card : styles.shortCard}>
      <>
        {type === "full" && (
          <>
            <h3>
              {weekday}, {date}
            </h3>
            <div className={styles.weatherDescription}>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt=""
              />
              <div className={styles.weather}>
                <h4>{main}</h4>
                <h4>({description})</h4>
              </div>
            </div>
            <h4 className={styles.temperature}>{shortedTemperature}</h4>
          </>
        )}

        {type === "short" && (
          <div className={styles.shortWeather}>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt=""
            />
            <span className={styles.temperature}>{shortedTemperature}</span>
          </div>
        )}
      </>
    </div>
  );
};

export default WeatherCard;
