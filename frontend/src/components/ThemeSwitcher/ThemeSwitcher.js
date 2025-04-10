import React from "react";
import styles from "./ThemeSwitcher.module.css";

import { FiSun } from "react-icons/fi";
const ThemeSwitcher = () => {
  return (
    <>
      <div className="wrapper">
        <label htmlFor="" className={styles.switch}>
          <input type="text" className={styles.checkbox} />
          <span className={styles.sliderRound}>
            <FiSun className={styles.icon} />
          </span>
        </label>
      </div>
    </>
  );
};

export default ThemeSwitcher;
