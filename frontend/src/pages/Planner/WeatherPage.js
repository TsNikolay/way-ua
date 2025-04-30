import React, { useContext } from "react";
import styles from "./WeatherPage.module.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../contexts/PlannerFormContext";

const WeatherPage = () => {
  const { weather } = useContext(PlannerFormContext);
  console.log(weather);
  return (
    <div>
      <h1 className={styles.title}>LET'S PLAN YOUR TRIP</h1>
      <div className={styles.container}>
        <ProgressBar />
        <div className={styles.weather}>
          <h3 className={styles.question}>
            ☀️ Let's check the weather for your trip
          </h3>
        </div>

        <div className={styles.buttons}>
          <button className={styles.button}>Back</button>
          <button className={styles.button}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
