import React from "react";
import { getDayAndMonth, getWeekday } from "../../utils/datesUtils";
import styles from "./WeatherItem.module.css";

const WeatherItem = ({ weatherDay }) => {
  const weekday = getWeekday(weatherDay.dt * 1000);
  const date = getDayAndMonth(weatherDay.dt * 1000);
  const shortedTemperature = String(weatherDay.temp.day).split(".")[0] + "°C";
  return (
    <div className={styles.card}>
      <h3>
        {weekday}, {date}
      </h3>
      <div className={styles.weatherDescription}>
        <img
          src={`https://openweathermap.org/img/wn/${weatherDay.weather[0].icon}@2x.png`}
          alt=""
        />
        <div className={styles.weather}>
          <h4>{weatherDay.weather[0].main}</h4>
          <h4>({weatherDay.weather[0].description})</h4>
        </div>
      </div>
      <h4 className={styles.temperature}>{shortedTemperature}</h4>
    </div>
  );
};

export default WeatherItem;
