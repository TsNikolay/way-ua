import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

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

  // const handleGetMe = async () => {
  //   try {
  //     const response = await getMeRequest();
  //     setUserInfo(response.data.user);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  if (state.isLoading) {
    return <h1>Loading...</h1>;
  }

  //Якщо є шлях повернення, беремо його, якщо ні — дефолтний
  const from = location.state?.from || "/routes";

  return (
    <div className={styles.card}>
      <h2>Register</h2>
      <form onSubmit={(e) => handleRegister(e)} className={styles.form}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <label className={styles.label}>Confirm password</label>
        <input
          className={styles.input}
          type="password"
          value={confirmPassword}
          placeholder="Repeat your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          SIGN UP
        </button>
        <Link className={styles.register} to={"/auth/login"}>
          Already a user? Log in
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
