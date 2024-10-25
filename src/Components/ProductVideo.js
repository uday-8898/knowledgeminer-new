import React from 'react';
import '../Styles/ProductVideo.css';

const ProductVideo = () => {
  return (
    <div className="video-section">
        <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/7OFv7zGheF4?si=K7W5-dCRkT2jD_7o" // Replace with your product video link
          title="Product Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ProductVideo;
