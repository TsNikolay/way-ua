import React, { useContext, useEffect } from "react";
import styles from "./LocationDatesPage.module.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../contexts/PlannerFormContext";
//Стилі для вибору дат подорожі
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";

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

  const handleContinue = async () => {
    try {
      localStorage.setItem("selectedCity", JSON.stringify(city));
      localStorage.setItem("selectedDates", JSON.stringify(dates));
      await getAttractions(city);
      await getHotels(city);

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
      <h1 className={styles.title}>LET'S PLAN YOUR TRIP</h1>
      <div className={styles.container}>
        <ProgressBar />
        <div className={styles.destination}>
          <h3 className={styles.question}>🗺️ Where would you like to go?</h3>
          <GooglePlacesAutocomplete
            apiKey={apiKey}
            debounce={1000}
            autocompletionRequest={{
              types: ["(cities)"],
              componentRestrictions: {
                country: ["ua"],
              },
            }}
            selectProps={{
              placeholder: "Select a city",
              value: city,
              city: city,
              onChange: (value) => {
                setCity(value);
                getCityCoordinates(value);
              },
            }}
          />
        </div>
        <div className={styles.dates}>
          <h3 className={styles.question}>
            📅 What dates are you planning a trip for?
          </h3>

          <div className={styles.dateWrapper}>
            <div className={styles.dateRangePicker}>
              <DateRangePicker
                format="dd/MM/yyyy"
                dayPlaceholder="_"
                monthPlaceholder="__"
                yearPlaceholder="____"
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
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDatesPage;
