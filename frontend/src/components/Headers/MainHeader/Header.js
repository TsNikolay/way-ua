import React, { useContext, useRef } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import AuthContext from "../../../contexts/AuthContext";
import UserContext from "../../../contexts/UserContext";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const { clearUserInfo } = useContext(UserContext);
  const { isAuth } = useContext(AuthContext);

  //Наступні дві константи для респонсів навбару
  const navRef = useRef();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    navRef.current.classList.toggle(styles.responsiveNav);
  };

  const handleLogin = () => {
    navigate("/auth/login", { state: { from: "/dashboard" } });
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearUserInfo();
    } catch (err) {
      console.error(
        "Logout failed:",
        err.response?.data?.message || err.message,
      );
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>WAY.UA</div>

      <nav ref={navRef} className={styles.nav}>
        <Link to="/">HOME</Link>
        <Link to="/#about">ABOUT</Link>
        <Link to="/">CONTACTS</Link>
        {isAuth && <Link to="/">ACCOUNT</Link>}

        <div className={styles.mobileControls}>
          <ThemeSwitcher />
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
          <div>
            <img
              src="/images/default-avatar.png"
              alt=""
              className={styles.avatarImage}
            />
            <button className={styles.loginBtn} onClick={() => handleLogout()}>
              LOGOUT
            </button>
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={() => handleLogin()}>
            LOGIN
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
