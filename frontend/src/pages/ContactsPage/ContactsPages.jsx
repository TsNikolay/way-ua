import React, { useContext, useState } from "react";
import styles from "./ContactsPage.module.css";
import { FaUser, FaEnvelope } from "react-icons/fa";
import AuthContext from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { sendFeedbackRequest } from "../../api/contactsApi";

const ContactsForm = () => {
  const { user, isAuth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [useCurrentEmail, setUseCurrentEmail] = useState(false);
  const { t } = useTranslation();

  const handleCheckboxChange = () => {
    if (!useCurrentEmail && user?.email) {
      setEmail(user.email);
    } else {
      setEmail("");
    }
    setUseCurrentEmail(!useCurrentEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await sendFeedbackRequest(
        firstName,
        lastName,
        email,
        message,
      );
      if (response.status === 200) {
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setUseCurrentEmail(false);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to send feedback";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>{t("contactspage.contact_us")}</h2>
      <div className={styles.contactContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <FaUser className={styles.icon} />
              <input
                type="text"
                placeholder={t("contactsform.first_name")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder={t("contactsform.last_name")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup} style={{ flex: 2 }}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              placeholder={t("contactsform.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={useCurrentEmail}
            />
          </div>
          {isAuth && (
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="useCurrentEmail"
                checked={useCurrentEmail}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="useCurrentEmail">
                {t("contactsform.use_current_email")}
              </label>
            </div>
          )}

          <div className={styles.inputGroup}>
            <textarea
              placeholder={t("contactsform.your_message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {success && (
            <p style={{ color: "green" }}>{t("contactsform.success")}</p>
          )}
          {error && <p className={styles.error}>{t("contactsform.error")}</p>}
          <button className={styles.submitButton} type="submit">
            {t("contactsform.send")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactsForm;
