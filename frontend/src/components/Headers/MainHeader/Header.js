import React from "react";
import styles from "./Header.module.css";

import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>WAY.UA</div>

      <nav className={styles.nav}>
        <a href="#">HOME</a>
        <a href="#">ABOUT US</a>
        <a href="#">CONTACTS</a>
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
