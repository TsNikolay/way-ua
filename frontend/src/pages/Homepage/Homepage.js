import React, { useContext, useEffect } from "react";
import styles from "./Homepage.module.css";
import AboutSection from "../../components/AboutSection/AboutSection";
import { useLocation, useNavigate } from "react-router-dom";
import PlannerFormContext from "../../contexts/PlannerFormContext";

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPlannerState } = useContext(PlannerFormContext);

  useEffect(() => {
    //Щоб скролити до секції (в нашому випадку about)
    if (location.hash) {
      const elementToFind = document.querySelector(location.hash);
      if (elementToFind) {
        elementToFind.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleStart = () => {
    resetPlannerState();
    navigate("/planner/step1");
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.callToAction}>
          <div className={styles.blurredBackground}></div>
          <h1 className={styles.slogan}>
            DISCOVER <span className={styles.ukraine}>UKRAINE</span> WITH US
          </h1>
          <button onClick={() => handleStart()}>PLAN YOUR TRIP</button>
        </div>

        <div className={styles.quote}>
          <div className={styles.author}>
            <hr />
            <h3>Nina Herceg</h3>
          </div>
          <div className={styles.words}>
            “We travel not to escape life but for life not to escape us”
          </div>
        </div>

        <div className={styles.about} id="about">
          <h1 className={styles.aboutTitle}>ABOUT SERVICE</h1>
          <AboutSection
            title="ROUTE PLANNING"
            description="PLAN ROUTES BETWEEN UKRAINE'S LANDMARKS"
          />
          <AboutSection
            title="WEATHER FORECAST"
            description="GET UP-TO-DATE WEATHER FORECASTS FOR YOUR ROUTE"
          />
          <AboutSection
            title="PDF AND GPX EXPORT"
            description="EXPORT YOUR ROUTES FOR OFFLINE USE"
          />
          <AboutSection
            title="ACHIEVEMENT SYSTEM"
            description="EARN REWARDS FOR YOUR ACTIVITY IN THE APP"
          />
          <AboutSection
            title="3D MODELS"
            description="EXPLORE UKRAINE LANDMARKS IN 3D FORMAT RIGHT IN THE APP"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
