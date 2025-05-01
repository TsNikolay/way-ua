import React, { useContext, useEffect } from "react";
import styles from "./LocationDatesPage.module.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import PlannerFormContext from "../../contexts/PlannerFormContext";
//Стилі для вибору дат подорожі
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const LocationDatesPage = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const navigate = useNavigate();
  const {
    city,
    date,
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
  } = useContext(PlannerFormContext);

  const handleContinue = async () => {
    try {
      localStorage.setItem("selectedCity", JSON.stringify(city));
      localStorage.setItem("selectedDates", JSON.stringify(date));
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

    //Коли сюди переходять по кнопці чи по адресній стрічці треба чистити стейт
    resetPage();
    resetHotels();
    resetSelectedHotels();
    resetAttractions();
    resetSelectedAttractions();
    resetWeather();
  }, []);

  // Зберігаємо в localStorage при змінах
  useEffect(() => {
    localStorage.setItem("selectedCity", JSON.stringify(city));
  }, [city]);

  useEffect(() => {
    localStorage.setItem("selectedDates", JSON.stringify(date));
  }, [date]);

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
              value: city.label && city,
              city: city.label,
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
          <DateRangePicker
            className={styles.dateRangePicker}
            format="dd/MM/yyyy"
            dayPlaceholder={"_"}
            monthPlaceholder={"__"}
            yearPlaceholder={"____"}
            rangeDivider={"-"}
            onChange={setDates}
            value={date}
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={
              date.length > 0 && city
                ? styles.button
                : `${styles.button} ${styles.inactive}`
            }
            onClick={date.length > 0 && city ? () => handleContinue() : null}
            disabled={!(city && date.length > 0)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDatesPage;
