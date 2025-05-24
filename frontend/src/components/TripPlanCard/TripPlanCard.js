import React from "react";
import styles from "./TripPlanCard.module.css";
import { Link } from "react-router-dom";

const TripPlanCard = ({ tripDay }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div>
      <div key={tripDay.day_number} className={styles.dayCard}>
        <h2 className={styles.dayTitle}>Day {tripDay.day_number}</h2>
        <div className={styles.activitiesList}>
          {tripDay.activities.map((activity, index) => (
            <div key={index} className={styles.activityCard}>
              <Link
                className={styles.placeImageContainer}
                to={`https://www.google.com/maps/search/?api=1&query=${activity.place_name} ${activity.address}`}
                target="_blank"
              >
                <img
                  className={styles.placeImage}
                  src={
                    activity.photo_reference
                      ? `${API_URL}/planner/image?photo_reference=${activity.photo_reference}`
                      : "/images/default-leisure.png"
                  }
                  alt={activity.place_name}
                  onError={(e) => {
                    e.target.src = "/images/default-leisure.png";
                  }}
                />
              </Link>

              <div className={styles.placeInfo}>
                <div className={styles.placeNameAndTime}>
                  <h3 className={styles.placeName}>{activity.place_name}</h3>
                  <div className={`${styles.timeIcon}`}>
                    {activity.time_slot === "morning" && (
                      <img src="/images/morning.png" alt="Morning" />
                    )}
                    {activity.time_slot === "afternoon" && (
                      <img src="/images/afternoon.png" alt="Afternoon" />
                    )}
                    {activity.time_slot === "evening" && (
                      <img src="/images/evening.png" alt="Evening" />
                    )}
                  </div>
                </div>
                <p className={styles.address}>
                  {activity.address && <i>📍 {activity.address}</i>}
                </p>
                {activity.notes && (
                  <p className={styles.notes}>💡 {activity.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripPlanCard;
