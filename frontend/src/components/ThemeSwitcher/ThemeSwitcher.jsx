import React, { useContext } from "react";
import styles from "./ThemeSwitcher.module.css";
import { FiSun, FiMoon } from "react-icons/fi";
import UserContext from "../../contexts/UserContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(UserContext);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="wrapper">
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className={styles.checkbox}
        />
        <span className={styles.sliderRound}>
          <span className={styles.iconWrapper}>
            {theme === "dark" ? (
              <FiMoon className={styles.icon} />
            ) : (
              <FiSun className={styles.icon} />
            )}
          </span>
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
