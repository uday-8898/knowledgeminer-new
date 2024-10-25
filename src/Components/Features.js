import React from 'react';
import '../Styles/Features.css'; // Make sure to update the CSS file accordingly
import graphImage1 from '../assets/ff1.gif';
import graphImage2 from '../assets/ff2.gif';
import graphImage3 from '../assets/ff3.gif';
import graphImage4 from '../assets/ff4.gif';

const Features = () => {
  return (
    <div className="card-container">

      <div className="card-item">
        <div className="card-face card-header">
          <div className="card-content">
            <img 
              src={graphImage1} 
              alt="Design" 
              style={{ marginLeft:'40px', width: '120px', height: '120px' }} // Set your desired dimensions
            />
            <h3>Advanced Analytics</h3>
          </div>
        </div>
        <div className="card-face card-footer">
          <p>
            Leverages machine learning to deliver deep business intelligence and insight extraction.
          </p>
        </div>
      </div>

      <div className="card-item">
        <div className="card-face card-header">
          <div className="card-content">
            <img 
              src={graphImage2} 
              alt="Code" 
              style={{ marginLeft:'49px', width: '100px', height: '100px' }} // Set your desired dimensions
            />
            <h3>Multi-Document Querying</h3>
          </div>
        </div>
        <div className="card-face card-footer">
          <p>
            Processes and queries across diverse document types with high precision.
          </p>
        </div>
      </div>

      <div className="card-item">
        <div className="card-face card-header">
          <div className="card-content">
            <img 
              src={graphImage3} 
              alt="Launch" 
              style={{ marginLeft:'49px', width: '100px', height: '100px' }} // Set your desired dimensions
            />
            <h3>Seamless Integration</h3>
          </div>
        </div>
        <div className="card-face card-footer">
          <p>
            Integrates with platforms like Microsoft Teams, internal systems, and websites.
          </p>
        </div>
      </div>

      <div className="card-item">
        <div className="card-face card-header">
          <div className="card-content">
            <img 
              src={graphImage4} 
              alt="Launch" 
              style= {{ marginLeft:'49px', width: '100px', height: '100px' }} // Set your desired dimensions
            />
            <h3>Scalability & Performance</h3>
          </div>
        </div>
        <div className="card-face card-footer">
          <p>
            Efficiently handles large data volumes and concurrent queries with optimized speed.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Features;
