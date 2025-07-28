import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Gallery from '../components/Gallery/Gallery';
import Amenities from '../components/Amenities/Amenities';
import ContactAgent from '../components/ContactAgent/ContactAgent';
import { fetchPropertyById } from '../firebaseUtils';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await fetchPropertyById(id);
        setProperty(data);
      } catch (error) {
        navigate('/properties');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading Property Details...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="not-found">
        <h2>Property Not Available</h2>
        <p>The property you're looking for doesn't exist or may have been removed.</p>
        <Link to="/properties" className="back-link">
          ← Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="property-details-container">
      <div className="property-hero">
        <img src={property.image} alt={property.title} className="hero-image" />
        <div className="property-hero-content">
          <h1>{property.title}</h1>
          <p className="property-location">
            <i className="fas fa-map-marker-alt"></i> {property.location}
          </p>
          <div className="price-badge">₦{property.price}/month</div>
        </div>
      </div>

      <div className="property-content">
        <div className="property-main">
          <Gallery images={property.images || [property.image]} />

          <div className="property-highlights">
            <div className="highlight-item">
              <span className="highlight-value">{property.bedrooms}</span>
              <span className="highlight-label">Bedrooms</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-value">{property.bathrooms}</span>
              <span className="highlight-label">Bathrooms</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-value">{property.area} sqft</span>
              <span className="highlight-label">Area</span>
            </div>
          </div>

          <div className="property-section">
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>

          <Amenities amenities={property.amenities || []} />
        </div>

        <div className="property-sidebar">
          <ContactAgent property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
