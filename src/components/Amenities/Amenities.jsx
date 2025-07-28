import React from 'react';
import './Amenities.css';

const Amenities = ({ amenities }) => {
  return (
    <div className="amenities-grid">
      {amenities.map((amenity, index) => (
        <div key={index} className="amenity-item">
          <i className="fas fa-check"></i> {amenity}
        </div>
      ))}
    </div>
  );
};

export default Amenities;