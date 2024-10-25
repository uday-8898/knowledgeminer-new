import React from 'react';
import '../Styles/Hero.css';
import clogo from '../assets/clogo.png';

function Hero() {
    return (
        <div className='hero' id='home'>
            <div className="text-content">
                <div className="motto">
                   <img 
                   src={clogo} 
                   alt="Meridian Solution" 
                   loading="lazy" 
                   />
                    <h1>Revolutionize Business Intelligence</h1>
                        <h1> <span className='textspan' style={{ color: 'rgb(51, 51, 255)' }}>AI-Driven Solutions for Data Discover</span> </h1>
                    <p>Empower your business with cutting-edge AI that delivers fast, accurate insights and seamless integration into your existing systems.</p>
                    <div className="btn-section">
                    <a href="https://datadiscover.ai" target="_blank" rel="noopener noreferrer">
                    {/* <button className="btnn-hero chtbot">
                    Upload Your Documents
                   </button> */}
                  </a>  
                 </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;

