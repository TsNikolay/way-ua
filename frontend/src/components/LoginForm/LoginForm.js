import React, { useContext, useState } from "react";
import styles from "./LoginForm.module.css";
import AuthContext from "../../contexts/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message,
      );
    }
  };

  return (
    <div className={styles.card}>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default LoginForm;
