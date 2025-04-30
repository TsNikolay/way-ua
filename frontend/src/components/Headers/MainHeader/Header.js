import React, { useRef } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  //Наступні дві константи для респонсів навбару
  const navRef = useRef();
  const toggleNavbar = () => {
    navRef.current.classList.toggle(styles.responsiveNav);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>WAY.UA</div>

      <nav ref={navRef} className={styles.nav}>
        <Link to="/">HOME</Link>
        <Link to="/#about">ABOUT</Link>
        <Link to="/">CONTACTS</Link>

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
        <button className={styles.loginBtn}>LOGIN</button>
        <button className={styles.navBtn} onClick={toggleNavbar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
