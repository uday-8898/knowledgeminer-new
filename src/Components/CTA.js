import React from 'react';
import '../Styles/CTA.css';

const CTA = () => {
  return (
    <div className="cta-container">
      <div className="cta-content">
        <h2>Transform Data into Insights with AI!</h2>
        <p>Start today and unlock the full potential of your data with our cutting-edge platform!</p>
      </div>
      <div className="cta-button">
      <button
        className="btnn-her chtbot"
        onClick={() => document.querySelector('#faq-form-section').scrollIntoView({ behavior: 'smooth' })}
        >
        Get in touch
      </button>      </div>
    </div>
  );
};

export default CTA;
