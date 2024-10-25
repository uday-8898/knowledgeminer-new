import React from 'react';
import '../Styles/Footer.css'; // Import the CSS file for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container grid">
        <div className="footer__content grid">
          <a href="https://datadiscover.azurewebsites.net/" className="footer__logo">DataDiscover.ai</a>

          <ul className="footer__links">
            <li>
              <a href="#home" className="footer__link">Home</a>
            </li>
            <li>
              <a href="#about-section" className="footer__link">About Us</a>
            </li>
            <li>
              <a href="#timeline-main" className="footer__link">Steps</a>
            </li>
            <li>
              <a href="#why-choose-us" className="footer__link">Why Choose Us</a>
            </li>
          </ul>

          <div className="footer__social">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="footer__social-link">
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="footer__social-link">
              <i className="ri-instagram-fill"></i>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="footer__social-link">
              <i className="ri-twitter-x-line"></i>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="footer__social-link">
              <i className="ri-linkedin-box-fill"></i>
            </a>
          </div>
        </div>

        <span className="footer__copy">&#169; Meridian Solutions Pvt Ltd 2024. All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
