import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import styles from "./WeatherList.module.css";
import { calculateTripDays } from "../../utils/datesUtils";
import PlannerFormContext from "../../contexts/PlannerFormContext";

const WeatherList = ({ weatherDays, type = "full" }) => {
  const { dates } = useContext(PlannerFormContext);

  const numberOfTripsDays = calculateTripDays(dates);
  const isEmptyDays = weatherDays.length < numberOfTripsDays;

  const renderEmptyCards = () => {
    const cards = [];
    const missingCount = numberOfTripsDays - weatherDays.length;
    for (let i = 0; i < missingCount; i++) {
      cards.push(
        <WeatherCard
          key={`empty-${i}`}
          weatherDay={null}
          type={type}
          empty={true}
        />,
      );
    }
    return cards;
  };

  return (
    <div className={type === "full" ? styles.list : styles.shortList}>
      {weatherDays.map((weatherDay, i) => {
        return <WeatherCard key={i} weatherDay={weatherDay} type={type} />;
      })}
      {isEmptyDays && renderEmptyCards()}
    </div>
  );
};

export default WeatherList;
