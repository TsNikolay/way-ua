import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { isAuth, register, refresh, logout, ...state } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refresh();
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const avatar_url = "/images/default-avatar.png";
      await register(email, password, name, avatar_url);
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Register failed";

      setError(message);
    }
  };

  if (state.isLoading) {
    return <h1>Loading...</h1>;
  }

  //Якщо є шлях повернення, беремо його, якщо ні — дефолтний
  const from = location.state?.from || "/routes";

  return (
    <div className={styles.card}>
      <h2>{t("registerpage.register")}</h2>
      <form onSubmit={(e) => handleRegister(e)} className={styles.form}>
        <label className={styles.label}>{t("registerpage.name")}</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          placeholder={t("registerpage.enter_your_name")}
          onChange={(e) => setName(e.target.value)}
        />

        <label className={styles.label}>{t("registerpage.email")}</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          placeholder={t("registerpage.enter_your_email")}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>{t("registerpage.password")}</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          placeholder={t("registerpage.enter_your_password")}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className={styles.label}>
          {t("registerpage.confirm_password")}
        </label>
        <input
          className={styles.input}
          type="password"
          value={confirmPassword}
          placeholder={t("registerpage.repeat_your_password")}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          {t("registerpage.sign_up")}
        </button>
        <Link className={styles.register} to={"/auth/login"}>
          {t("registerpage.already_a_user_log_in")}
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
