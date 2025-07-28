import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase'; // Make sure this path is correct
import PropertyCard from './PropertyCard';
import './PropertyListings.css';

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(collection(db, 'properties'), where('status', '!=', 'rented'));
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(results);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="loading">Loading properties...</div>;

  return (
    <div className="property-listings-container">
      <h1>Available Properties</h1>
      <div className="property-grid">
        {properties.map(property => (
          <Link
            to={`/properties/${property.id}`}
            key={property.id}
            className="property-card-link"
          >
            <PropertyCard property={property} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyListings;

