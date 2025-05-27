import React, { useContext, useEffect } from "react";
import styles from "./WeatherPage.module.css";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../../contexts/PlannerFormContext";
import { useNavigate } from "react-router-dom";
import {
  calculateTripDays,
  getTripDaysWeather,
} from "../../../utils/datesUtils";
import WeatherList from "../../../components/WeatherList/WeatherList";
import WeatherMapper from "../../../mappers/weather.mapper";
import { useTranslation } from "react-i18next";
import UserContext from "../../../contexts/UserContext";

const WeatherPage = () => {
  const {
    weather,
    setPage,
    dates,
    city,
    selectedHotel,
    selectedAttractions,
    hotels,
    attractions,
    getTripPlan,
  } = useContext(PlannerFormContext);
  const { language } = useContext(UserContext);

  const { t } = useTranslation();

  useEffect(() => {
    setPage(2);
  }, []);

  const navigate = useNavigate();
  const invalidData =
    !weather ||
    dates.length === 0 ||
    !city ||
    hotels.length === 0 ||
    attractions.length === 0;

  //Якщо даних не вистачає пересилаємо на початок форми
  if (invalidData) {
    navigate("/planner/step1", { replace: true });
    return null;
  }

  const cityShortLabel = city.label.split(",").slice(0, 2).join(",");
  const startDate = new Date(dates[0]).toLocaleDateString();
  const endDate = new Date(dates[1]).toLocaleDateString();
  const numberOfTripDays = calculateTripDays(dates);
  const weatherDaysView = weather.list.map((weatherDayApi) =>
    WeatherMapper.apiToViewModel(weatherDayApi),
  );
  const tripDaysWeather = getTripDaysWeather(weatherDaysView, dates);

  const localDates = [startDate, endDate];

  const dataForPlan = {
    city: cityShortLabel,
    dates: localDates,
    duration: numberOfTripDays,
    hotel: selectedHotel,
    attractions: selectedAttractions,
    weather: tripDaysWeather,
    language: language,
  };

  const handleBack = () => {
    navigate("/planner/step2");
    //Погоду не стираємо бо тут переходимо на сторінку готелей, а погода від них не залежить,
    // зітремо погоду при поверненні на сторінку вибору міста,
    // бо там вже від зміни міста може залежити погода
  };

  const handleEditTrip = () => {
    navigate("/planner/step1");
  };

  const handlePlanTrip = async () => {
    navigate("/planner/report");
    await getTripPlan(dataForPlan);
  };

  return (
    <div>
      <h1 className={styles.title}>LET'S PLAN YOUR TRIP</h1>
      <div className={styles.container}>
        <ProgressBar />
        <div className={styles.weather}>
          <h3 className={styles.question}>
            ☀️ {t("weatherpage.lets_check_the_weather_for_your_trip")}
          </h3>
          <div className={styles.info}>
            <h2>
              🗺️{t("weatherpage.city")}:{" "}
              <span className={styles.infoValue}>
                {/*Обрізаємо "Ukraine", бо це і так очевидно*/}
                {cityShortLabel}
              </span>
            </h2>
            <h2>
              📅{t("weatherpage.dates")}:{" "}
              <span className={styles.infoValue}>
                {" "}
                {startDate} - {endDate}
              </span>
            </h2>
            <h2>
              {t("weatherpage.days")}:{" "}
              <span className={styles.infoValue}> {numberOfTripDays}</span>
            </h2>

            <button
              onClick={() => handleEditTrip()}
              className={`${styles.button} ${styles.changeButton}`}
            >
              {t("weatherpage.edit_trip")}
            </button>
          </div>

          <WeatherList weatherDays={tripDaysWeather} />
        </div>

        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.buttonBack}`}
            onClick={() => handleBack()}
          >
            {t("planner.back")}
          </button>
          <button className={styles.button} onClick={() => handlePlanTrip()}>
            {t("planner.plan_my_trip")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
