import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { isAuth, login, refresh, logout, ...state } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuth) {
      if (from) {
        navigate(from, { replace: true });
      } else {
        navigate(`/`);
      }
    }
  }, [isAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    }
  };

  if (state.isLoading) {
    return <h1>Loading...</h1>;
  }

  const moveToRegister = async () => {
    navigate("/auth/register", { state: { from: "/planner/report" } });
  };

  //Якщо є шлях повернення, беремо його, якщо ні — дефолтний
  const from = location.state?.from || "/routes";

  return (
    <div className={styles.card}>
      <h2>{t("loginpage.log_in")}</h2>
      <form onSubmit={(e) => handleLogin(e)} className={styles.form}>
        <label className={styles.label}>{t("loginpage.email")}</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          placeholder={t("loginpage.enter_your_email")}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>{t("loginpage.password")}</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          placeholder={t("loginpage.enter_your_password")}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          {t("loginpage.log_in_capital")}
        </button>
        <button className={styles.register} onClick={moveToRegister}>
          {t("loginpage.new_here_register_now")}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
