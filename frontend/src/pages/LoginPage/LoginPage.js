import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { isAuth, login, refresh, logout, ...state } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refresh();
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
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

  // const handleGetMe = async () => {
  //   try {
  //     const response = await getMeRequest();
  //     setUserInfo(response.data.user);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     clearUserInfo();
  //   } catch (err) {
  //     console.error(
  //         "Logout failed:",
  //         err.response?.data?.message || err.message,
  //     );
  //   }
  // };

  if (state.isLoading) {
    return <h1>Loading...</h1>;
  }

  //Якщо є шлях повернення, беремо його, якщо ні — дефолтний
  const from = location.state?.from || "/dashboard";

  return (
    <div className={styles.card}>
      <h2>Log in</h2>
      <form onSubmit={(e) => handleLogin(e)} className={styles.form}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
