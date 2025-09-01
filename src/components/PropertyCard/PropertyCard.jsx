import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  if (!property || !property.id) {
    console.error("Invalid property data:", property);
    return null;
  }

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          src={property.image || '/default-property.jpg'} 
          alt={property.title || 'Property'} 
          className="property-image"
          loading="lazy"
        />
        <div className="property-badges">
          <span className="property-price">
            #{typeof property.price === "string" && property.price.includes("-")
? property.price
.split("-")
.map(p => Number(p.trim()).toLocaleString())
.join(" - ")
: Number(property.price || 0).toLocaleString()}/mo
          </span>
          {property.status === 'rented' && (
            <span className="property-status rented">Rented</span>
          )}
          {property.featured && (
            <span className="property-featured">Featured</span>
          )}
        </div>
      </div>

      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">
          <i className="fas fa-map-marker-alt"></i> {property.location}
        </p>
        
        <div className="property-features">
          <span><i className="fas fa-room"></i> {property.singleRooms} single rooms</span>
          <span><i className="fas fa-room"></i> {property.selfContainRooms} self-contained rooms</span>
          <span>
            <i className="fas fa-ruler-combined"></i> 
            {property.area ? `${property.area.toLocaleString()} sqft` : 'N/A'}
          </span>
        </div>
        
        <Link 
          to={`/properties/${property.id}`} 
          className="view-details-btn"
          state={{ property }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
