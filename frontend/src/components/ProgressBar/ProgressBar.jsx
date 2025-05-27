import React, { useContext } from "react";
import PlannerFormContext from "../../contexts/PlannerFormContext";
import styles from "./ProgressBar.module.css";
import { useTranslation } from "react-i18next";

const ProgressBar = () => {
  const { page } = useContext(PlannerFormContext);
  const { t } = useTranslation();
  const stepEmojis = {
    0: `${t("progressbar.step")} 1: 🗺️📅`,
    1: `${t("progressbar.step")} 2: 🏨🎡`,
    2: `${t("progressbar.step")} 3: 🌡️☀️`,
  };

  const interval = 100 / Object.keys(stepEmojis).length;
  const progress = ((page + 1) * interval).toFixed(2);
  const steps = Object.values(stepEmojis).map((label, index) => {
    const [step, emoji] = label.split(":");

    return (
      <div className={styles.barmarker} key={index}>
        <span className={styles.stepLabel}>{step}:</span>
        <span className={styles.stepEmoji}>{emoji}</span>
      </div>
    );
  });

  return (
    <div className={styles.progressContainer}>
      <div className={styles.barmarkerContainer}>{steps}</div>
      <progress
        className={styles.progress}
        max="100"
        value={progress}
      ></progress>
    </div>
  );
};

export default ProgressBar;
