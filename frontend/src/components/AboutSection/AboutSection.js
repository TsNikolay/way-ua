import React from "react";
import styles from "./AboutSection.module.css";

const AboutSection = ({ title, description, image }) => {
  const imageLink = image || "https://placehold.co/125x75?text=No img";
  return (
    <div className={styles.aboutSection}>
      <div className={styles.textBlock}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <img src={imageLink} alt={title} className={styles.image} />
    </div>
  );
};

export default AboutSection;
