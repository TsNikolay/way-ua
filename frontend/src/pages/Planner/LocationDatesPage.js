import React, { useContext } from "react";
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
  const { city, date, setCity, setDates, setPage, getHotels, getAttractions } =
    useContext(PlannerFormContext);

  const handleContinue = async () => {
    try {
      setPage(1);
      await getHotels(city.label, date[0], date[1]);
      await getAttractions(city.label, date[0], date[1]);
      navigate("/planner/step2");
    } catch (err) {
      console.error(
        "Impossible to go to Step 2:",
        err.response?.data?.message || err.message,
      );
    }
  };

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
              city,
              onChange: (value) => {
                setCity(value);
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
              date && city
                ? styles.button
                : `${styles.button} ${styles.inactive}`
            }
            onClick={date && city ? () => handleContinue() : null}
            disabled={!(city && date)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDatesPage;
