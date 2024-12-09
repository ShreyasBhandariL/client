import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import otp from '../assets/otp.jpeg';
import start from '../assets/start.png';
import quantity from '../assets/quantity.jpeg';
import "../Styles/About.css";
import donate2 from "../assets/donate2.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

const DonateFunds = () => {
  const { t } = useTranslation();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <>
      <div
        className="card card-cover h-100 overflow-hidden text-bg-dark rounded-0 shadow-lg"
        style={{
          backgroundImage: `url(${donate2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginTop: "20px",
        }}
      >
        <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
          <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" style={{ color: '#E0FFFF' }}>
            {t('stepsTitle')}
          </h3>
          <button 
            onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })} 
            className="btn mt-auto bg-white" 
            style={{ color: "black" }}
          >
            {t('followSteps')}
          </button>
        </div>
      </div>

      <div className="App">
        <div className="container">
          <div className="content" data-aos="fade-up">
            <div 
              className="left" 
              ref={leftRef} 
              data-side="left" 
              data-aos="slide-right"
            >
              <div className="steps">
                {/* Step 1: Select a School */}
                <div 
                  ref={el => stepRefs.current[0] = el} 
                  data-index="0"
                  className="step" // Added class for styling
                  data-aos="fade-in"
                >
                  <div className="icon-wrapper">
                    <img src={start} alt={t('selectSchool')} className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>{t('selectSchool')}</h2>
                    <p>{t('selectSchoolDesc')}</p>
                  </div>
                </div>

                {/* Step 2: Choose Quantity */}
                <div 
                  ref={el => stepRefs.current[1] = el} 
                  data-index="1"
                  className="step" // Added class for styling
                  data-aos="fade-in"
                >
                  <div className="icon-wrapper">
                    <img src={quantity} alt={t('chooseQuantity')} className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>{t('chooseQuantity')}</h2>
                    <p>{t('chooseQuantityDesc')}</p>
                  </div>
                </div>

                {/* Step 3: Confirm OTP */}
                <div 
                  ref={el => stepRefs.current[2] = el} 
                  data-index="2"
                  className="step" // Added class for styling
                  data-aos="fade-in"
                >
                  <div className="icon-wrapper">
                    <img src={otp} alt={t('confirmOTP')} className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>{t('confirmOTP')}</h2>
                    <p>{t('confirmOTPDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="right" 
              ref={rightRef} 
              data-side="right" 
              data-aos="slide-left"
            >
              <div className="phone-wrapper">
                <div className="phone">
                  <div className="dynamic-island">
                    <div className="camera-circle">
                      <div className="camera-icon"></div>
                    </div>
                  </div>
                  <video
                    className="phone-video"
                    src="src/assets/process.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    Video not supported
                  </video>
                  <div className="button power-button"></div>
                  <div className="volume-button volume-up-button"></div>
                  <div className="volume-button volume-down-button"></div>
                  <div className="side-button"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonateFunds;
