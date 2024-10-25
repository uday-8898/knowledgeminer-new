import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react"; // Import useMsal from MSAL React
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaBars,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import "../Styles/Navbar.css";
import { loginRequest } from "../authConfig"; // Import your MSAL login configuration

const Navbar = () => {
  const navigate= useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { instance } = useMsal(); // Use MSAL instance for authentication

  const handleClick = () => {
    // Start login process using MSAL
    instance.loginPopup(loginRequest)
      .then((response) => {
        console.log("Login successful:", response);
        // Optionally, you can handle any post-login logic here, like storing the access token or user info
        sessionStorage.setItem('msalToken', response.accessToken);
        navigate('/tools');

      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="main-nav">
        <div className="logo">
          <a href="https://datadiscover.azurewebsites.net/" rel="noopener noreferrer">
            DataDiscover.ai
          </a>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#about-section">About Us</a>
          </li>
          <li>
            <a href="#timeline-main">Steps</a>
          </li>
          <li>
            <a href="#why-choose-us">Why Choose Us</a>
          </li>
          <li>
            <a href="#faq-form-section">Contact</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
        </ul>
        <button className="get-started-btn" onClick={handleClick}>
          Get Started
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
