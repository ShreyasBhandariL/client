/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import "../index.css";
import { Card, CardBody } from "react-bootstrap";
const training = () => {
  return (
    
    <div className="training">
      <div className="d-flex card-head">
        <Card className="card">
          <img src="../src/assets/Aiet-College.jpg" />
          <CardBody>Alvas Institute of Engineering And Technology</CardBody>
        </Card>
        <Card className="card">
          <img src="../src/assets/Aiet-College.jpg" />
          <CardBody>Alvas Institute of Engineering And Technology</CardBody>
        </Card>
        <Card className="card">
          <img src="../src/assets/Aiet-College.jpg" />
          <CardBody>Alvas Institute of Engineering And Technology</CardBody>
        </Card>
        <Card className="card">
          <img src="../src/assets/Aiet-College.jpg" />
          <CardBody>Alvas Institute of Engineering And Technology</CardBody>
        </Card>
        <Card className="card">
          <img src="../src/assets/Aiet-College.jpg" />
          <CardBody>Alvas Institute of Engineering And Technology</CardBody>
        </Card>
        <Card className="card">
          <img src="../src/assets/Aiet-College.jpg" />
          <CardBody>Alvas Institute of Engineering And Technology</CardBody>
        </Card>
        <Card className="card">
          <img src="../src/assets/Aiet-College.jpg" />

          <CardBody><div className="item">
          <div className="d-flex justify-content-center align-items-center">
            <div className="card mx-2" style={{ width: '18rem', height: '100%' }}>
              <img src={publics} className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} alt="Slide 4" />
              <div className="card-body">
                <h5 className="card-title">Card 4 Title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div></CardBody>
        </Card>
      </div>
    </div>
    
  );
};

export default training;
