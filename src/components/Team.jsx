/* eslint-disable no-unused-vars */
import React from "react";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import "../Styles/Team.css"; // Import your CSS file for styling

const Team = () => {
  return (
    <div className="container">
      <div className="section-title" data-aos="fade-in" data-aos-delay="100">
        <h2>Team</h2>
        <p style={{ color: "black" }}>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
          aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
          quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
          fugiat sit in iste officiis commodi quidem hic quas.
        </p>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="member" data-aos="fade-up">
            <div className="pic">
              <img src={team2} className="team-image" alt="" />
            </div>
            <div className="member-info">
              <h4> Mullai Muhilan MP</h4>
              <span> Deputy Commissioner (DC) of Dakshina Kannada (DK)</span>
              <div className="social">
                <a href="#">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="member" data-aos="fade-up" data-aos-delay="150">
            <div className="pic">
              <img src={team1} className="team-image" alt="" />
            </div>
            <div className="member-info">
              <h4>P Shravan Kumar</h4>
              <span>Probationary IAS officer of Dakshina Kannada (DK)</span>
              <div className="social">
                <a href="#">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="member" data-aos="fade-up">
            <div className="pic">
              <img src={team2} className="team-image" alt="" />
            </div>
            <div className="member-info">
              <h4> Mullai Muhilan MP</h4>
              <span> Deputy Commissioner (DC) of Dakshina Kannada (DK)</span>
              <div className="social">
                <a href="#">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
