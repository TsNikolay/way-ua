import React, { useContext, useEffect } from "react";
import styles from "./HotelsAttractionsPage.module.css";

import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../../contexts/PlannerFormContext";
import HotelList from "../../../components/HotelList/HotelList";
import { useNavigate } from "react-router-dom";
import AttractionList from "../../../components/AttractionList/AttractionList";
import { useTranslation } from "react-i18next";
import UserContext from "../../../contexts/UserContext";

const HotelsAttractionsPage = () => {
  const {
    hotels,
    attractions,
    selectedHotel,
    selectedAttractions,
    setPage,
    getWeather,
    city,
    dates,
  } = useContext(PlannerFormContext);
  const { language } = useContext(UserContext);

  const navigate = useNavigate();
  const { t } = useTranslation();

  //Щоб зпобігти перехід на цю сторінку через адресну стрічку якщо не заповнені минулі поля
  if (
    dates.length === 0 ||
    !city ||
    hotels.length === 0 ||
    attractions.length === 0
  ) {
    navigate("/planner/step1", { replace: true });
  }

  const handleContinue = async () => {
    window.scrollTo(0, 0); // Вгору сторінки
    const { lat, lng } = city.coordinates;
    try {
      await getWeather(lat, lng, language); // Не передаю кількість днів бо завжди проситиму максимум, а вже потім фільтрувати по датам
      navigate("/planner/step3");
    } catch (err) {
      console.error(
        "Impossible to go to Step 3:",
        err.response?.data?.message || err.message,
      );
    }
  };

  const handleBack = () => {
    navigate("/planner/step1");
  };

  // Завантажуємо з localStorage при першому запуску
  useEffect(() => {
    //Ставимо правильну сторінку
    setPage(1);
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
    if (selectedAttractions.length > 0) {
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
            🏨{" "}
            {t("hotelsattractionspage.which_hotel_would_you_like_to_stay_at")}
          </h3>
          {hotels.length === 0 ? (
            <p>{t("hotelsattractionspage.loading_hotels")}</p>
          ) : (
            <HotelList hotels={hotels} />
          )}
        </div>

        <div className={styles.attractions}>
          <h3 className={styles.question}>
            🎡{" "}
            {t(
              "hotelsattractionspage.what_attractions_would_you_like_to_visit",
            )}
          </h3>
          {attractions.length === 0 ? (
            <p>{t("hotelsattractionspage.loading_attractions")}</p>
          ) : (
            <AttractionList attractions={attractions} />
          )}
        </div>

        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => handleBack()}>
            {t("planner.back")}
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
            {t("planner.continue")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelsAttractionsPage;
