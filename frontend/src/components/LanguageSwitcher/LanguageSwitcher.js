import React from "react";
import styles from "./LanguageSwitcher.module.css";
import { FaGlobe } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";

const LanguageSwitcher = () => {
  return (
    <div className={styles.language}>
      <FaGlobe />
      <span>EN</span>
      <span className={styles.arrow}>
        <TiArrowSortedDown />
      </span>
    </div>
  );
};

export default LanguageSwitcher;
