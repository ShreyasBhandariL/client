import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Oops! The page you're looking for doesn't exist.</h2>
      <p>
        <Link to="/" className="home-button">Back to Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
