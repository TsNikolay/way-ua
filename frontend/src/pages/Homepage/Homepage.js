import React, { useContext, useEffect } from "react";
import styles from "./Homepage.module.css";
import AboutSection from "../../components/AboutSection/AboutSection";
import { useLocation, useNavigate } from "react-router-dom";
import PlannerFormContext from "../../contexts/PlannerFormContext";
import { validateTokenRequest } from "../../api/authApi";
import AuthContext from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPlannerState } = useContext(PlannerFormContext);
  const { refresh } = useContext(AuthContext);
  const { t } = useTranslation();

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

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await validateTokenRequest(token);

        if (response.status === 200) {
          refresh();
        }
      } catch (err) {
        console.warn("Access token invalid or expired");
      }
    };

    checkAuth(); // вызываем async-функцию
  }, []);

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.callToAction}>
          <div className={styles.blurredBackground}></div>
          <h1 className={styles.slogan}>
            <Trans i18nKey="homepage.slogan">
              DISCOVER <span className={styles.ukraine}>UKRAINE</span> WITH US
            </Trans>
          </h1>
          <button onClick={() => handleStart()}>
            {t("homepage.letsPlan")}
          </button>
        </div>

        <div className={styles.quote}>
          <div className={styles.author}>
            <hr />
            <h3>{t("homepage.nina_herceg")} </h3>
          </div>
          <div className={styles.words}>“{t("homepage.quote")}”</div>
        </div>

        <div className={styles.about} id="about">
          <h1 className={styles.aboutTitle}>{t("homepage.about_service")}</h1>
          <AboutSection
            title={t("aboutsection.firstTitle")}
            description={t("aboutsection.firstText")}
          />
          <AboutSection
            title={t("aboutsection.secondTitle")}
            description={t("aboutsection.secondText")}
          />
          <AboutSection
            title={t("aboutsection.thirdTitle")}
            description={t("aboutsection.thirdText")}
          />
          <AboutSection
            title={t("aboutsection.fourthTitle")}
            description={t("aboutsection.fourthText")}
          />
          <AboutSection
            title={t("aboutsection.fifthTitle")}
            description={t("aboutsection.fifthText")}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
