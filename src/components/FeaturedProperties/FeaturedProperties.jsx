// src/components/FeaturedProperties/FeaturedProperties.jsx

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // your firebase config
import PropertyCard from '../PropertyCard/PropertyCard';
import './FeaturedProperties.css';

const FeaturedProperties = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'properties'));
        const allProperties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const featuredOnly = allProperties.filter(p => p.featured === true);
        setFeatured(featuredOnly);
      } catch (error) {
        console.error('Failed to fetch featured properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) return <p className="loading-text">Loading featured properties...</p>;

  if (featured.length === 0) {
    return (
      <div className="no-featured">
        <p>No featured properties available yet.</p>
      </div>
    );
  }

  return (
    <div className="featured-properties-grid">
      {featured.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default FeaturedProperties;
