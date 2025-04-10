import React from "react";
import styles from "./Header.module.css";

import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>WAY.UA</div>

      <nav className={styles.nav}>
        <Link to="#">HOME</Link>
        <Link to="#">ABOUT US</Link>
        <Link to="#">CONTACTS</Link>
      </nav>

      <div className={styles.controls}>
        <ThemeSwitcher />
        <LanguageSwitcher />

        <button className={styles.loginBtn}>LOGIN</button>
      </div>
    </header>
  );
};

export default Header;
