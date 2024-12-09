import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next'; 
import "../Styles/Events.css";
import butha from "../assets/img/home/butha.jpg";
import kambla1 from "../assets/img/home/kambla1.jpg";
import daff from "../assets/img/home/daff.jpg";
import saraswathi from "../assets/img/home/saraswathi.jpg";
import dasara from "../assets/img/home/dasara.jpg";
import cris from "../assets/img/home/crism.png";

const Events = () => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const carouselRef = useRef(null);
  const thumbnailBorderRef = useRef(null);
  const timeRef = useRef(null);

  let timeRunning = 3000;
  let timeAutoNext = 7000;
  let runTimeOut, runNextAuto;

  useEffect(() => {
    const SliderDom = carouselRef.current.querySelector(".event-list");
    const thumbnailItemsDom =
      thumbnailBorderRef.current.querySelectorAll(".event-item");

    thumbnailBorderRef.current.appendChild(thumbnailItemsDom[0]);

    nextRef.current.onclick = () => showSlider("next");
    prevRef.current.onclick = () => showSlider("prev");

    runNextAuto = setTimeout(() => {
      nextRef.current.click();
    }, timeAutoNext);

    function showSlider(type) {
      const SliderItemsDom = SliderDom.querySelectorAll(".event-item");
      const thumbnailItemsDom =
        thumbnailBorderRef.current.querySelectorAll(".event-item");

      if (type === "next") {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderRef.current.appendChild(thumbnailItemsDom[0]);
        carouselRef.current.classList.add("next");
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderRef.current.prepend(
          thumbnailItemsDom[thumbnailItemsDom.length - 1]
        );
        carouselRef.current.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselRef.current.classList.remove("next");
        carouselRef.current.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextRef.current.click();
      }, timeAutoNext);
    }

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);
  const { t } = useTranslation(); 
  return (
    <>
      <div
        className="section-title"
        data-aos="fade-in"
        data-aos-delay="100"
        style={{ marginBottom: "-30px" }}
      >
        <h2>{t('eventsDK')}</h2>
      </div>
      <div
        className="event-carousel"
        ref={carouselRef}
        style={{ marginTop: "0px" }}
      >
        <div className="event-list">
          <div className="event-item">
            <img src={butha} />
            <div class="overlay"></div>
            <div className="event-content">
              <div className="event-title"> {t('eventsDKT')}</div>
              <div className="event-topic"> {t('eventsDK1')}</div>
              <div className="event-des"></div>
              <div className="event-buttons">
                <button
                  onClick={() =>
                    window.open("https://dk.nic.in/en/tourism", "_blank")
                  }
                >
                  MORE
                </button>
              </div>
            </div>
          </div>
          <div className="event-item">
            <img src={kambla1} />
            <div class="overlay"></div>

            <div className="event-content">
              <div className="event-title"> {t('eventsDKT')}</div>
              <div className="event-topic"> {t('eventsDK2')}</div>
              <div className="event-buttons">
                <button
                  onClick={() =>
                    window.open("https://dk.nic.in/en/tourism", "_blank")
                  }
                >
                  MORE
                </button>
              </div>
            </div>
          </div>

          <div className="event-item">
            <img src={daff} />
            <div class="overlay"></div>

            <div className="event-content">
              <div className="event-title"> {t('eventsDK')}</div>
              <div className="event-topic"> {t('eventsDK3')}</div>
              <div className="event-buttons">
                <button
                  onClick={() =>
                    window.open("https://dk.nic.in/en/tourism", "_blank")
                  }
                >
                  MORE
                </button>
              </div>
            </div>
          </div>
          <div className="event-item">
            <img src={saraswathi} />
            <div class="overlay"></div>

            <div className="event-content">
              <div className="event-title"> {t('eventsDKT')}</div>
              <div className="event-topic"> {t('eventsDK4')}</div>
              <div className="event-buttons">
                <button
                  onClick={() =>
                    window.open("https://dk.nic.in/en/tourism", "_blank")
                  }
                >
                  MORE
                </button>
              </div>
            </div>
          </div>
         
          <div className="event-item">
            <img src={cris} />
            <div class="overlay"></div>
            <div className="event-content">
              <div className="event-title"> {t('eventsDK')}</div>
              <div className="event-topic"> {t('eventsDK5')}</div>
              <div className="event-buttons">
                <button
                  onClick={() =>
                    window.open("https://dk.nic.in/en/tourism", "_blank")
                  } 
                >
                MORE
                </button>
              </div>
            </div>
          </div>
          {/* Other slides can be added here... */}
        </div>

        {/* Thumbnail section */}
        <div className="event-thumbnail" ref={thumbnailBorderRef}>
          <div className="event-item">
            <img src={cris} />
            <div className="event-content">
              <div className="event-title"> {t('eventsDK5')}</div>
            </div>
          </div>
        

          <div className="event-item">
            <img src={butha} />
            <div className="event-content">
              <div className="event-title"> {t('eventsDK1')}</div>
            </div>
          </div>

          <div className="event-item">
            <img src={kambla1} />
            <div className="event-content">
              <div className="event-title"> {t('eventsDK2')}</div>
            </div>
          </div>

          <div className="event-item">
            <img src={daff} />
            <div className="event-content">
              <div className="event-title"> {t('eventsDK3')}</div>
            </div>
          </div>
          <div className="event-item">
            <img src={saraswathi} />
            <div className="event-content">
              <div className="event-title"> {t('eventsDK4')}</div>
            </div>
          </div>

          {/* Other thumbnails can be added here... */}
        </div>

        {/* Carousel navigation */}
        <div className="event-arrows">
          <button id="prev" ref={prevRef}>
            &lt;
          </button>
          <button id="next" ref={nextRef}>
            &gt;
          </button>
        </div>
        <div className="event-time" ref={timeRef}></div>
      </div>
    </>
  );
};

export default Events;
