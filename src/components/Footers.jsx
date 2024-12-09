/* eslint-disable no-unused-vars */
import React from 'react';

const Footer = () => {
  return (
    <div>
      

      <div className="container">
        <div className="copyright pt-0">
        <div className="footer-top m-0 pt-0">
                <div className="social-links mt-3">
                  <h3 style={{fontFamily:"inherit"}}>CONNECT US</h3>
                  <a href="https://www.facebook.com/DKDCOfficial" className="facebook" target="_blank" rel="noopener noreferrer">
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com/dc_dakshinakannada?igsh=cDYzbmJ2cnRyY303" className="instagram"  target="_blank" rel="noopener noreferrer"><i className="bx bxl-instagram"></i></a>
                  <a href="https://dk.nic.in/en/about-district/whos-who/" className="google-plus" target="_blank" rel="noopener noreferrer"><i className="bx bxl-google"></i></a>
                  <a href="https://x.com/dcdkofficial" className="linkedin" target="_blank" rel="noopener noreferrer"><i className="bx bxl-twitter" ></i></a>
                </div>
      </div>
          &copy; Content Owned and Maintained by  <strong><span>Dakshina Kannada District Administration</span></strong>
        </div>
        <div className="credits">
          Developed by <a href="">AIET Students</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
