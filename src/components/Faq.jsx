import React, { useState } from "react";
import "../Styles/Faq.css";
import { useTranslation } from 'react-i18next';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      id: 1,
      question: t('faq1'),
      answer: t('faq1Answer'),
    },
    {
      id: 2,
      question: t('faq2'),
      answer: t('faq2Answer'),
    },
    {
      id: 3,
      question: t('faq3'),
      answer: t('faq3Answer'),
    },
    {
      id: 4,
      question: t('faq4'),
      answer: t('faq4Answer'),
    },
    {
      id: 5,
      question: t('faq5'),
      answer: t('faq5Answer'),
    },
    {
      id: 6,
      question: t('faq6'),
      answer: t('faq6Answer'),
    },
    {
      id: 7,
      question: t('faq7'),
      answer: t('faq7Answer'),
    },
    {
      id: 8,
      question: t('faq8'),
      answer: t('faq8Answer'),
    },
  ];

  return (
    <div className="container">
      <div className="main-wrapper py-5 text-center">
        <h4 className="heading mb-4">{t('faq')}</h4>
        <div className="divider mb-4"></div>
        <div className="accordion">
          {faqItems.map((item, index) => (
            <div key={item.id} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${openIndex === index ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => handleToggle(index)}
                >
                  {item.question}
                </button>
              </h2>
              <div className={`accordion-collapse ${openIndex === index ? "show" : ""}`}>
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
