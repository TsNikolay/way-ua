import React from "react";
import WeatherItem from "../WeatherItem/WeatherItem";
import styles from "./WeatherList.module.css";

const WeatherList = ({ weatherDays }) => {
  return (
    <div className={styles.list}>
      {weatherDays.map((weatherDay) => {
        return <WeatherItem weatherDay={weatherDay} />;
      })}
    </div>
  );
};

export default WeatherList;
