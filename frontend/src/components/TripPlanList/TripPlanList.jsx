import React from "react";
import styles from "./TripPlanList.module.css";
import TripPlanCard from "../TripPlanCard/TripPlanCard";

const TripPlanList = ({ trip }) => {
  return (
    <div className={styles.tripContainer}>
      {trip.days.map((day, i) => (
        <TripPlanCard tripDay={day} key={i} />
      ))}
    </div>
  );
};

export default TripPlanList;
