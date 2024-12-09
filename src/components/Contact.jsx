/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
const backend = import.meta.env.VITE_DATABASE_URL;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ""); // Remove numbers and special characters
    if (value.length <= 30) {
      setName(value);
    }
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z0-9\s]/g, ""); // Allow only letters and numbers
    if (value.length <= 100) {
      setSubject(value);
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setMessage(value);
      setErrorMessage(""); // Clear error message if within limit
    } else {
      setErrorMessage(t('messageCannot'));
    }
  };

  const validateInputs = () => {
    if (!validateName(name)) {
      setErrorMessage("Name should be up to 20 letters and contain no numbers.");
      return false;
    }
    if (!validateSubject(subject)) {
      setErrorMessage("Subject cannot contain special characters.");
      return false;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!validateMessage(message)) {
      setErrorMessage(t('messageCannot'));
      return false;
    }
    return true;
  };

  const sendContactDetails = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!validateInputs()) return; // Validate inputs before proceeding

    // Confirmation dialog
    const isConfirmed = window.confirm(t('areYouSure'));
    if (!isConfirmed) return; // If the user clicks "Cancel", stop the submission

    try {
      setLoader(true);
      const response = await fetch(`${backend}/users/ContactUS`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        alert(errorResult.message || "An error occurred while sending the message.");
        return;
      }

      const result = await response.json();
      alert(result.message);
      resetForm();
    } catch (error) {
      alert("An error occurred while sending the message.");
      console.error("Error sending contact details:", error);
    } finally {
      setLoader(false);
    }
  };

  const validateName = (name) => /^[A-Za-z\s]{1,30}$/.test(name);
  const validateSubject = (subject) => /^[A-Za-z0-9\s]+$/.test(subject);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMessage = (message) => message.length <= 1000;

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrorMessage(""); // Clear error message
  };
  const { t } = useTranslation(); 
  return (
    <div className="container" data-aos="fade-up">
      <div className="section-title">
        <h2>{t('contactUs')}</h2>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="info-box mb-4">
            <i className="bx bx-map"></i>
            <h3>{t('ourAddress')}</h3>
            <p style={{ color: "black" }}>
            {t('addressDDPI')}
            </p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="info-box mb-4">
            <i className="bx bx-envelope"></i>
            <h3>{t('emailUs')}</h3>
            <p style={{ color: "black" }}>{t('email')}</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="info-box mb-4">
            <i className="bx bx-phone-call"></i>
            <h3>{t('callUs')}</h3>
            <p style={{ color: "black" }}>{t('number')}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <iframe
            className="mb-4 mb-lg-0"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15556.268261446536!2d74.8368274!3d12.9034091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b223a7ed603%3A0x34c90bd5c753d82b!2sDDPI%20DAKSHINA%20KANNADA!5e0!3m2!1sen!2sin!4v1727100270242!5m2!1sen!2sin"
            frameBorder="0"
            style={{ border: 0, width: "100%", height: "384px" }}
            allowFullScreen
            title="Google Maps"
          ></iframe>
        </div>

        <div className="col-lg-6">
          <form className="email-form" onSubmit={sendContactDetails}>
            <div className="row">
              <div className="col-md-6 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder={t('yourName')}
                  required
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder={t('yourEmail')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                placeholder={t('subject')}
                required
                value={subject}
                onChange={handleSubjectChange}
              />
            </div>
            <div className="form-group mt-3">
              <textarea
                className="form-control"
                name="message"
                rows="5"
                placeholder={t('message')}
                required
                value={message}
                onChange={handleMessageChange}
              ></textarea>
            </div>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            <div className="my-3">
              <div className="loading">Loading</div>
              <div className="sent-message"></div>
            </div>
            <div className="text-center">
              <button type="submit" className="button-submit" disabled={loader}>
              {loader ? "Sending..." : t('sendMessage')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
