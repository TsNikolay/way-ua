import React, { useContext, useState } from "react";
import styles from "./HotelsAttractionsPage.module.css";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../contexts/PlannerFormContext";
import HotelList from "../../components/HotelList/HotelList";

const HotelsAttractionsPage = () => {
  const {
    hotels,
    attractions,
    setSelectedHotel,
    setSelectedAttractions,
    selectedHotel,
    selectedAttractions,
  } = useContext(PlannerFormContext);

  const handleContinue = async (event) => {
    // event.preventDefault();
    // try {
    //   setPage(1);
    //   await getHotels(city, date[0], date[1]);
    //   await getAttractions(city, date[0], date[1]);
    // } catch (err) {
    //   console.error(
    //     "Impossible to go to Step 2:",
    //     err.response?.data?.message || err.message,
    //   );
    // }
  };

  const handleBack = async (event) => {};

  return (
    <div>
      <h1 className={styles.title}>LET'S PLAN YOUR TRIP</h1>
      <div className={styles.container}>
        <ProgressBar />
        <div className={styles.hotels}>
          <h3 className={styles.question}>
            🏨 Which hotel would you like to stay at?
          </h3>
          {hotels.length <= 0 ? (
            <p>Loading hotels...</p>
          ) : (
            <HotelList hotels={hotels} />
          )}
        </div>
        <div className={styles.attractions}>
          <h3 className={styles.question}>
            🎡 What attractions would you like to visit??
          </h3>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => handleBack()}>
            Back
          </button>
          <button
            className={
              selectedHotel && selectedAttractions.length > 0
                ? styles.button
                : `${styles.button} ${styles.inactive}`
            }
            onClick={
              selectedHotel && selectedAttractions.length > 0
                ? () => handleContinue()
                : null
            }
            disabled={!(selectedHotel && selectedAttractions.length > 0)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelsAttractionsPage;
