import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Styles/style.css";
import logo from "../assets/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [activeLink, setActiveLink] = useState("LandingPage");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveLink(section.getAttribute("id"));
        }
      });

      const scrollThreshold = location.pathname.startsWith("/completeDetails")
        ? 450
        : 700;

      if (location.pathname.startsWith("/description")) {
        setScrolled(true);
      } else if (scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    const icon = document.querySelector(".mobile-nav-toggle");
    icon.classList.toggle("active"); // Toggle the active class for animation
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsNavOpen(false);
      toggleNav();
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const isDescriptionPage = location.pathname.startsWith("/description");
  const isCompleteDetails = location.pathname.startsWith("/completeDetails");

  return (
    <header id="header" className={`${scrolled ? "header-scrolled" : ""}`}>
      <nav
        id="navbar"
        className={`navbar ${isNavOpen ? "navbar-mobile" : ""} ${
          scrolled && isNavOpen ? "navbar-mobile-scrolled" : ""
        }`}
        style={{ padding: "0" }}
      >
        <div
          className="container align-items-center justify-content-between"
          style={{ padding: "0" }}
        >
          <div
            className="logo"
            style={{ display: "flex", alignItems: "center" }}
          >
            <a href="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="Crowd Funding Logo"
                style={{
                  width: "55px",
                  height: "40px",
                  marginRight: "3px",
                  marginTop: "-30px",
                }}
              />
              <div style={{ marginTop: "-15px" }}>
                <h1
                  className="text-light"
                  style={{ fontSize: "1.5rem", textAlign: "left" }}
                >
                  ನಮಗಾಗಿ
                </h1>
                <p style={{ fontSize: "0.7rem" }}>
                  "ನಿಮ್ಮ ಸಹಾಯ, ನಮ್ಮ ಬೆಳವಣಿಗೆ"
                </p>
              </div>
            </a>
          </div>

          {!isDescriptionPage && !isCompleteDetails && (
            <>
              <ul>
                <li>
                  <a
                    className={`nav-link scrollto ${
                      activeLink === "LandingPage" ? "active" : ""
                    }`}
                    href="#LandingPage"
                    onClick={handleNavLinkClick}
                  >
                    {t("home").charAt(0).toUpperCase() + t("home").slice(1)}
                  </a>
                </li>
                <li>
                  <a
                    className={`nav-link scrollto ${
                      activeLink === "about" ? "active" : ""
                    }`}
                    href="#aboutus"
                    onClick={handleNavLinkClick}
                  >
                    {t("aboutUs").charAt(0).toUpperCase() +
                      t("aboutUs").slice(1)}
                  </a>
                </li>

                <li>
                  <a
                    className={`nav-link scrollto ${
                      activeLink === "how" ? "active" : ""
                    }`}
                    href="#donateFunds"
                    onClick={handleNavLinkClick}
                  >
                    {t("steps").charAt(0).toUpperCase() + t("steps").slice(1)}
                  </a>
                </li>
                <li>
                  <a
                    className={`nav-link scrollto ${
                      activeLink === "portfolio" ? "active" : ""
                    }`}
                    href="#portfolio"
                    onClick={handleNavLinkClick}
                  >
                    {t("donate").charAt(0).toUpperCase() + t("donate").slice(1)}
                  </a>
                </li>
                <li>
                  <a
                    className={`nav-link scrollto ${
                      activeLink === "Events" ? "active" : ""
                    }`}
                    href="#events"
                    onClick={handleNavLinkClick}
                  >
                    {t("events").charAt(0).toUpperCase() + t("events").slice(1)}
                  </a>
                </li>
                <li
                  style={{
                    visibility: scrolled ? "visible" : "hidden",
                    transition: "visibility 0.3s ease-in-out",
                  }}
                >
                  <a
                    href="#language" // Arbitrary href for structure
                    className={`nav-link ${language === "en" ? "active" : ""}`}
                    onClick={(e) => e.preventDefault()} // Prevent default anchor behavior
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }} // Aligns the select properly
                  >
                    <select
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      style={{
                        background: "none", // Removes background
                        border: "none", // Removes default border
                        font: "inherit", // Ensures font style is inherited
                        padding: "0", // Removes padding for a cleaner look
                        appearance: "none", // Removes default dropdown arrow for cleaner look
                        outline: "none", // Removes focus outline
                        cursor: "pointer", // Ensures the select looks clickable
                        fontSize: "inherit", // Inherits font size from parent (consistent with other links)
                        width: "auto", // Adjust width to fit the content
                        color: "white", // Text color for selected value (matches navbar items)
                      }}
                    >
                      <option value="en" style={{ color: "black", fontSize:"1rem" }}>
                        English
                      </option>
                      <option value="kn" style={{ color: "black", fontSize:"1rem"  }}>
                        ಕನ್ನಡ
                      </option>
                    </select>
                  </a>
                </li>
              </ul>
              <div className="mobile-nav-toggle" onClick={toggleNav}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
