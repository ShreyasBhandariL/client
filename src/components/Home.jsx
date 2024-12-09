import { useEffect, useRef } from "react";
import Header from "../components/Header.jsx";
import Portfolio from "../components/Portfolio.jsx";
import "../App.css"
import AboutUS from "./AboutUs.jsx";
import Events from "./Events.jsx";
import '../Styles/LandingPage.css';
import Faq from "./Faq";
import Contact from "../components/Contact.jsx";
import Footers from "../components/Footers.jsx";
import "../Styles/style.css";
import kambla from "../assets/img/home/kambla1.jpg";
import amrithShettyImage from "../assets/img/home/butha.jpg";
import saraswathi from "../assets/img/home/saraswathi.jpg";
import { useTranslation } from 'react-i18next';
import DonateFunds from "./DonateFunds.jsx";

const images = [
  kambla,
  saraswathi,
  amrithShettyImage,
];

const H = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const slides = carouselRef.current.children;
    let currentSlide = 0;

    const interval = setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const { t } = useTranslation();

  return (
    <>
    <div className="home-container">
      <div className="head fixed-top header-transparent">
        <header id="header">
          <Header />
        </header>
      </div>

      <section id="LandingPage" className="LandingPage">
        <div className="carousel" ref={carouselRef} style={{ height: "100vh" }}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="hero-text-container" data-aos="fade-up">
          <h1>{t('join')}</h1>
          <h2>{t('joinDescription')}</h2>
          <a href="#aboutus" className="btn-get-started scrollto">
            <i className="bx bx-chevrons-down"></i>
          </a>
        </div>
      </section>

      <main id="main">
        <section id="aboutus" className="aboutus">
          <AboutUS />
        </section>
      

        <section id="donateFunds">
          <DonateFunds />
        </section>

        <section id="portfolio" className="portfolio pt-0">
          <Portfolio />
        </section>



        <section id="events" className="testimonials section-bg">
          <Events />
        </section>

        <Faq />

        <section id="contact" className="contact section-bg">
          <Contact />
        </section>

      </main>

      <footer id="footer">
        <Footers />
      </footer>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      </div>
    </>
  );
};

export default H;
