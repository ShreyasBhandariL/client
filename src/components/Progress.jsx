import React from 'react';

const Progress = ({ progress }) => {
  const radius = 45; // Adjust as needed
  const stroke = 10; // Adjust as needed
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  // Adjust the strokeDashoffset to start from the top (12 o'clock position)
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="lightgray"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="blue"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={`${circumference} ${circumference}`} // Use only circumference for correct rendering
        strokeDashoffset={strokeDashoffset}
        style={{ transition: 'stroke-dashoffset 0.5s ease 0s' }} // Smooth transition
        transform={`rotate(-90 ${radius} ${radius})`} // Rotate 90 degrees to the left
      />
      <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf" strokeWidth="1px" dy=".3em">
        {progress}%
      </text>
    </svg>
  );
};

export default Progress;