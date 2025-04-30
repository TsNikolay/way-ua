import React, { useContext, useEffect } from "react";
import styles from "./HotelsAttractionsPage.module.css";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../contexts/PlannerFormContext";
import HotelList from "../../components/HotelList/HotelList";
import { useNavigate } from "react-router-dom";
import AttractionList from "../../components/AttractionList/AttractionList";
import { countTripDays, getCityCoordinates } from "../../utils/plannerUtils";

const HotelsAttractionsPage = () => {
  const {
    hotels,
    setHotels,
    attractions,
    setAttractions,
    setSelectedHotel,
    setSelectedAttractions,
    selectedHotel,
    selectedAttractions,
    setPage,
    resetPlannerState,
    getWeather,
    city,
    date,
  } = useContext(PlannerFormContext);

  const navigate = useNavigate();

  const handleContinue = async () => {
    const numberOfDays = countTripDays(date[0], date[1]);

    const { lat, lng } = await getCityCoordinates(city);

    try {
      setPage(2);
      await getWeather(lat, lng, numberOfDays);
      navigate("/planner/step3");
    } catch (err) {
      console.error(
        "Impossible to go to Step 3:",
        err.response?.data?.message || err.message,
      );
    }
  };

  const handleBack = () => {
    resetPlannerState();
    navigate("/planner/step1");
  };

  // Завантажуємо з localStorage при першому запуску
  useEffect(() => {
    const savedHotels = localStorage.getItem("plannerHotels");
    const savedSelectedHotel = localStorage.getItem("selectedHotel");
    const savedAttractions = localStorage.getItem("plannerAttractions");
    const savedSelectedAttractions = localStorage.getItem(
      "selectedAttractions",
    );

    if (savedHotels) setHotels(JSON.parse(savedHotels));
    if (savedSelectedHotel) setSelectedHotel(JSON.parse(savedSelectedHotel));
    if (savedAttractions) setAttractions(JSON.parse(savedAttractions));
    if (savedSelectedAttractions)
      setSelectedAttractions(JSON.parse(savedSelectedAttractions));
  }, []);

  // Зберігаємо в localStorage при змінах
  useEffect(() => {
    if (hotels.length > 0) {
      localStorage.setItem("plannerHotels", JSON.stringify(hotels));
    }
  }, [hotels]);

  useEffect(() => {
    if (selectedHotel) {
      localStorage.setItem("selectedHotel", JSON.stringify(selectedHotel));
    }
  }, [selectedHotel]);

  useEffect(() => {
    if (attractions.length > 0) {
      localStorage.setItem("plannerAttractions", JSON.stringify(attractions));
    }
  }, [attractions]);

  useEffect(() => {
    if (selectedAttractions) {
      localStorage.setItem(
        "selectedAttractions",
        JSON.stringify(selectedAttractions),
      );
    }
  }, [selectedAttractions]);

  return (
    <div>
      <h1 className={styles.title}>LET'S PLAN YOUR TRIP</h1>
      <div className={styles.container}>
        <ProgressBar />
        <div className={styles.hotels}>
          <h3 className={styles.question}>
            🏨 Which hotel would you like to stay at?
          </h3>
          {hotels.length === 0 ? (
            <p>Loading hotels...</p>
          ) : (
            <HotelList hotels={hotels} />
          )}
        </div>

        <div className={styles.attractions}>
          <h3 className={styles.question}>
            🎡 What attractions would you like to visit?
          </h3>
          {attractions.length === 0 ? (
            <p>Loading attractions...</p>
          ) : (
            <AttractionList attractions={attractions} />
          )}
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
