import React, { useContext, useEffect } from "react";
import styles from "./LocationDatesPage.module.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../../contexts/PlannerFormContext";
//Стилі для вибору дат подорожі
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import userContext from "../../../contexts/UserContext";

const LocationDatesPage = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    city,
    dates,
    setCity,
    setDates,
    getHotels,
    getAttractions,
    resetPage,
    resetHotels,
    resetSelectedHotels,
    resetAttractions,
    resetSelectedAttractions,
    resetWeather,
    getCityCoordinates,
    resetPlannerState,
    resetTripPlan,
  } = useContext(PlannerFormContext);
  const { language, theme } = useContext(userContext);
  const { t } = useTranslation();

  const handleContinue = async () => {
    try {
      localStorage.setItem("selectedCity", JSON.stringify(city));
      localStorage.setItem("selectedDates", JSON.stringify(dates));
      await getAttractions(city, language);
      await getHotels(city, language);

      navigate("/planner/step2");
    } catch (err) {
      console.error(
        "Impossible to go to Step 2:",
        err.response?.data?.message || err.message,
      );
    }
  };

  // Дії при першому рендері компоненту
  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    const savedDates = localStorage.getItem("selectedDates");

    if (savedCity) setCity(JSON.parse(savedCity));
    if (savedDates) setDates(JSON.parse(savedDates));

    //Якщо ресетнулись зі сторінки з планом, то чистимо весь стейт
    if (location.state?.from === "/planner/report") {
      resetPlannerState();
    }

    //Якщо сюди перейшли то треба чистите весь стейт крім днів і локації
    resetPage();
    resetHotels();
    resetSelectedHotels();
    resetAttractions();
    resetSelectedAttractions();
    resetWeather();
    resetTripPlan();
  }, []);

  // Зберігаємо в localStorage при змінах
  useEffect(() => {
    localStorage.setItem("selectedCity", JSON.stringify(city));
  }, [city]);

  useEffect(() => {
    localStorage.setItem("selectedDates", JSON.stringify(dates));
  }, [dates]);

  return (
    <div>
      <h1 className={styles.title}>{t("planner.lets_plan_your_trip")}</h1>
      <div className={styles.container}>
        <ProgressBar />
        <div className={styles.destination}>
          <h3 className={styles.question}>
            🗺️ {t("locationdatespage.where_would_you_like_to_go")}
          </h3>
          <GooglePlacesAutocomplete
            apiKey={apiKey}
            debounce={1000}
            autocompletionRequest={{
              types: ["(cities)"],
              componentRestrictions: { country: ["ua"] },
            }}
            selectProps={{
              placeholder: t("locationdatespage.select_city"),
              value: city,
              onChange: (value) => {
                setCity(value);
                getCityCoordinates(value);
              },
              styles: {
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: theme === "light" ? "white" : "",
                  borderColor: state.isFocused
                    ? theme === "light"
                      ? "#555"
                      : "#888"
                    : theme === "light"
                    ? "#606060"
                    : "rgb(134,141,152)",

                  color: theme === "light" ? "black" : "white",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: theme === "light" ? "#666" : "#ccc", // цвет placeholder
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: theme === "light" ? "black" : "white", // выбранное значение
                }),
                input: (provided) => ({
                  ...provided,
                  color: theme === "light" ? "black" : "white", // текст при вводе
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor:
                    theme === "light" ? "white" : "rgb(73, 91, 179)",
                  color: theme === "light" ? "black" : "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused
                    ? theme === "light"
                      ? "#f0f0f0"
                      : "#4f4f7f"
                    : theme === "light"
                    ? "white"
                    : "rgb(75, 75, 147)",
                  color: theme === "light" ? "black" : "white",
                  cursor: "pointer",
                }),
              },
            }}
          />
        </div>
        <div className={styles.dates}>
          <h3 className={styles.question}>
            📅 {t("locationdatespage.what_dates_are_you_planning")}
          </h3>

          <div className={styles.dateWrapper}>
            <div className={styles.dateRangePicker}>
              <DateRangePicker
                format="dd/MM/yyyy"
                dayPlaceholder="_"
                monthPlaceholder="_ _"
                yearPlaceholder="_ _ _ _"
                rangeDivider="-"
                onChange={(value) => setDates(value || [])} // Щоб не мати помилку коли стираємо дати
                value={dates}
              />
            </div>

            <div className={styles.dateRangePickerForMobile}>
              <DateRangePicker
                format="dd/MM/yy"
                dayPlaceholder="_"
                monthPlaceholder="__"
                yearPlaceholder="____"
                rangeDivider=""
                onChange={(value) => setDates(value || [])}
                value={dates}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            className={
              dates.length > 0 && city
                ? styles.button
                : `${styles.button} ${styles.inactive}`
            }
            onClick={dates.length > 0 && city ? () => handleContinue() : null}
            disabled={!city || dates.length === 0}
          >
            {t("planner.continue")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDatesPage;
