import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './PropertyMap.css';

const PropertyMap = ({ location }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For demo purposes, we'll use these sample coordinates
        // In a real app, you would geocode the address or store coordinates in your database
        const demoLocations = {
          'New York, NY': { lat: 40.7128, lng: -74.0060 },
          'Austin, TX': { lat: 30.2672, lng: -97.7431 },
          'Los Angeles, CA': { lat: 34.0522, lng: -118.2437 },
          'Chicago, IL': { lat: 41.8781, lng: -87.6298 }
        };

        // Find coordinates for the location or use default
        const coords = demoLocations[location] || { lat: 39.8283, lng: -98.5795 }; // Default to US center
        
        setCoordinates(coords);
      } catch (err) {
        console.error("Geocoding error:", err);
        setError("Could not load map for this location");
      } finally {
        setLoading(false);
      }
    };

    geocodeAddress();
  }, [location]);

  if (loading) {
    return <div className="map-loading">Loading map...</div>;
  }

  if (error) {
    return <div className="map-error">{error}</div>;
  }

  return (
    <div className="property-map-container">
      <LoadScript 
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        loadingElement={<div className="map-loading">Loading Google Maps...</div>}
      >
        <GoogleMap
          mapContainerClassName="property-map"
          center={coordinates}
          zoom={14}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          <Marker 
            position={coordinates} 
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PropertyMap;