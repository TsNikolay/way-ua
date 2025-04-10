import React from "react";
import bgImage from "../../assets/images/bg-lightmode.jpg";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${bgImage})` }}
    ></div>
  );
};

export default Home;
