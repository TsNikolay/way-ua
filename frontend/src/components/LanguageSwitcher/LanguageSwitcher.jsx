import React, { useContext, useState } from "react";
import styles from "./LanguageSwitcher.module.css";
import { FaGlobe } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useTranslation } from "react-i18next";
import UserContext from "../../contexts/UserContext";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const changeLanguage = (lng) => {
    setLanguage(lng);
    setIsOpen(false); // закрываем меню после выбора
  };

  return (
    <div className={styles.languageSwitcher}>
      <div className={styles.languageButton} onClick={toggleDropdown}>
        <FaGlobe />
        <span>{i18n.language.toUpperCase()}</span>
        <span className={styles.arrow}>
          <TiArrowSortedDown />
        </span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <div
            className={`${styles.option} ${
              i18n.language === "en" ? styles.active : ""
            }`}
            onClick={() => changeLanguage("en")}
          >
            EN
          </div>
          <div
            className={`${styles.option} ${
              i18n.language === "uk" ? styles.active : ""
            }`}
            onClick={() => changeLanguage("uk")}
          >
            UK
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
