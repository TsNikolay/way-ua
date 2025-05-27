import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <div className={styles.logo}>WAY.UA</div>

        <div className={styles.links}>
          <Link to="#">{t("footer.home")}</Link>
          <Link to="#">{t("footer.about_us")}</Link>
          <Link to="#">{t("footer.contacts")}</Link>
        </div>
      </div>
      <hr className={styles.line}></hr>

      <div className={styles.socMediaLinks}>
        <Link to="#">
          <span>
            <FaInstagram />
          </span>
        </Link>
        <Link to="#">
          <span>
            <FaTelegram />
          </span>
        </Link>
        <Link to="#">
          <span>
            <FaFacebook />
          </span>
        </Link>
        <Link to="#">
          <span>
            <FaYoutube />
          </span>
        </Link>
      </div>
      <p className={styles.copyright}>{t("footer.copyright")}</p>
    </footer>
  );
};

export default Footer;
