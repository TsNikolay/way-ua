import React, { useState } from "react";
import styles from "./LocationDatesPage.module.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

//Стилі для вибору дат подорожі
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

const LocationDatesPage = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [location, setLocation] = useState();
  const [value, setValue] = useState();
  return (
    <div>
      <h1 className={styles.title}>LET'S PLAN YOUR TRIP</h1>
      <div className={styles.container}>
        <div className={styles.destination}>
          <h3 className={styles.question}>🗺️ Where would you like to go?</h3>
          <GooglePlacesAutocomplete
            apiKey={apiKey}
            debounce={1000}
            selectProps={{
              location,
              onChange: (value) => {
                setLocation(value);
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
            onChange={setValue}
            value={value}
          />
        </div>
        <button className={styles.button}>Continue</button>
      </div>
    </div>
  );
};

export default LocationDatesPage;
