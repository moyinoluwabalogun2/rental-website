import React, { useState } from 'react';
import './Gallery.css';

const Gallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="gallery">
      <div className="main-image">
        <img src={mainImage} alt="Main property view" />
      </div>
      <div className="thumbnail-grid">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
            onClick={() => setMainImage(img)}
          >
            <img src={img} alt={`Property view ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;