import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Statistics = () => {
  const [counts, setCounts] = useState({
    happyClients: 0,
    projects: 0,
    hoursOfSupport: 0,
    hardWorkers: 0
  });

  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the element is visible
    triggerOnce: true // Only trigger once when it first comes into view
  });

  useEffect(() => {
    if (inView) {
      const endValues = {
        happyClients: 232,
        projects: 521,
        hoursOfSupport: 1463,
        hardWorkers: 15
      };

      const duration = 5000; // Adjust duration in milliseconds for smoother animation
      const interval = 1; // Interval for updating counts

      const counters = Object.keys(counts).map((key) => ({
        key,
        start: 0,
        end: endValues[key],
        increment: Math.ceil((endValues[key] - 0) / (duration / interval))
      }));

      const updateCounts = () => {
        setCounts((prevCounts) => {
          const updatedCounts = { ...prevCounts };
          let allFinished = true;

          counters.forEach((counter) => {
            if (updatedCounts[counter.key] < counter.end) {
              updatedCounts[counter.key] = Math.min(
                updatedCounts[counter.key] + counter.increment,
                counter.end
              );
              allFinished = false;
            }
          });

          if (!allFinished) {
            setTimeout(updateCounts, interval);
          }

          return updatedCounts;
        });
      };

      updateCounts();
    }
  }, [inView]); // Trigger effect when `inView` changes

  return (
    <div className="container" ref={ref}>
 
      <div className="row no-gutters">
        <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
          <div className="count-box">
            <i className="bi bi-emoji-smile"></i>
            <span>{counts.happyClients}</span>
            <p><strong>Happy Backers</strong> supporting various projects</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
          <div className="count-box">
            <i className="bi bi-journal-richtext"></i>
            <span>{counts.projects}</span>
            <p><strong>Projects Funded</strong> successfully by the community</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
          <div className="count-box">
            <i className="bi bi-headset"></i>
            <span>{counts.hoursOfSupport}</span>
            <p><strong>Hours of Support</strong> provided to project creators</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
          <div className="count-box">
            <i className="bi bi-people"></i>
            <span>{counts.hardWorkers}</span>
            <p><strong>Dedicated Team Members</strong> working towards success</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
