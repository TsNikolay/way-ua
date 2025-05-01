import React, { useContext, useEffect } from "react";
import styles from "./WeatherPage.module.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../contexts/PlannerFormContext";
import { useNavigate } from "react-router-dom";

const WeatherPage = () => {
  const { weather, setPage, date, city, selectedHotel, selectedAttractions } =
    useContext(PlannerFormContext);
  const navigate = useNavigate();
  console.log(weather);

  const handleBack = () => {
    navigate("/planner/step2");
    //Погоду не стираємо бо тут переходимо на сторінку готелей, а погода від них не залежить,
    // зітремо погоду при поверненні на сторінку вибору міста,
    // бо там вже від зміни міста може залежити погода
  };

  useEffect(() => {
    if (
      date.length === 0 ||
      !city ||
      !selectedHotel ||
      selectedAttractions.length === 0
    ) {
      navigate("/planner/step1", { replace: true });
    }

    //Ставимо правильну сторінку
    setPage(2);
  }, []);

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
          <button className={styles.button} onClick={() => handleBack()}>
            Back
          </button>
          <button className={styles.button}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
