import React, { useContext, useState } from "react";
import styles from "./RegisterForm.module.css";
import AuthContext from "../../contexts/AuthContext";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const staticAvatarURL =
    "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, name, staticAvatarURL);
    } catch (err) {
      console.error(
        "Registration failed:",
        err.response?.data?.message || err.message,
      );
    }
  };

  return (
    <div className={styles.card}>
      <h2>Create an account</h2>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

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

export default RegisterForm;
