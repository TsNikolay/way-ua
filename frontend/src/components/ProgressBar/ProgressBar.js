import React, { useContext } from "react";
import PlannerFormContext from "../../contexts/PlannerFormContext";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  const { page, stepEmojis } = useContext(PlannerFormContext);

  const interval = 100 / Object.keys(stepEmojis).length;
  const progress = ((page + 1) * interval).toFixed(2);
  const steps = Object.values(stepEmojis).map((emojis, index) => {
    return (
      <h2 className={styles.barmarker} key={index}>
        {emojis}
      </h2>
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
