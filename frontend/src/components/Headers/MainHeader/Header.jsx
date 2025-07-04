import React, { useContext, useRef } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import AuthContext from "../../../contexts/AuthContext";
import UserContext from "../../../contexts/UserContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const { clearUserInfo, clearLanguage } = useContext(UserContext);
  const { isAuth } = useContext(AuthContext);
  const { t } = useTranslation();

  //Наступні дві константи для респонсів навбару
  const navRef = useRef();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    navRef.current.classList.toggle(styles.responsiveNav);
  };

  const handleLogin = () => {
    navigate("/auth/login", { state: { from: "/routes" } });
  };

  const moveToRoutes = () => {
    navigate("/routes");
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearUserInfo();
      clearLanguage();
    } catch (err) {
      console.error(
        "Logout failed:",
        err.response?.data?.message || err.message,
      );
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>{t("header.way_ua")}</div>

      <nav ref={navRef} className={styles.nav}>
        <Link to="/" onClick={toggleNavbar}>
          {t("header.home")}
        </Link>
        <Link to="/#about" onClick={toggleNavbar}>
          {t("header.about")}
        </Link>
        <Link to="/contacts" onClick={toggleNavbar}>
          {t("header.contacts")}
        </Link>

        <div className={styles.mobileControls}>
          <ThemeSwitcher />
          {isAuth && (
            <Link to="/routes" onClick={toggleNavbar}>
              {t("header.account")}
            </Link>
          )}
          <LanguageSwitcher />
        </div>

        <button
          className={`${styles.navBtn} ${styles.closeBtn}`}
          onClick={toggleNavbar}
        >
          <FaTimes />
        </button>
      </nav>

      <div className={styles.controls}>
        <ThemeSwitcher />
        <LanguageSwitcher />
        {isAuth ? (
          <div className={styles.loggedInProfileContainer}>
            <img
              src="/images/default-avatar.png"
              alt=""
              className={styles.avatarImage}
              onClick={moveToRoutes}
            />
            <button className={styles.loginBtn} onClick={() => handleLogout()}>
              {t("header.logout")}
            </button>
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={() => handleLogin()}>
            {t("header.login")}
          </button>
        )}

        <button className={styles.navBtn} onClick={toggleNavbar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
