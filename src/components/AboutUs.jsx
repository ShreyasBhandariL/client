/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from 'react-i18next'; 

const Services = () => {
  const { t } = useTranslation(); 
  return (
    <div className="container">
      <div className="section-title" data-aos="fade-in" data-aos-delay="100">
        <h2> {t('whyCrowd')}</h2>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box" data-aos="fade-up">
            <div className="icon">
              <i className="bx bxl-dribbble"></i>
            </div>
            <h4 className="title">
            {t('impactBorders')}
            </h4>
            <p className="description">
            {t('impactBordersDescription')}
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
            <div className="icon">
              <i className="bx bx-file"></i>
            </div>
            <h4 className="title">
            {t('impowering')}
            </h4>
            <p className="description">
            {t('impoweringDescription')}
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
            <div className="icon">
              <i className="bx bx-tachometer"></i>
            </div>
            <h4 className="title">
            {t('seeSupport')}
            </h4>
            <p className="description">
            {t('seeSupportDescription')}
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
            <div className="icon">
              <i className="bx bx-world"></i>
            </div>
            <h4 className="title">
            {t('invest')}
            </h4>
            <p className="description">
            {t('investDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
