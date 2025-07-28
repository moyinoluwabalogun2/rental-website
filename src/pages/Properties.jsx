import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import Filter from '../components/Filter/Filter';
import Search from '../components/Search/Search';
import { useLocation } from 'react-router-dom';
import { fetchAllProperties } from '../firebaseUtils'; // ✅ Fetch from Firestore
import './Properties.css';

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: [0, 50000000],
    bedrooms: 'any',
    status: 'all'
  });
  const location = useLocation();

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setAllProperties(data);
      } catch (error) {
        console.error('Failed to load properties:', error);
      }
    };
    loadProperties();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');

    let filtered = [...allProperties];

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = applyFilters(filtered, filters);
    setFilteredProperties(filtered);
  }, [location.search, filters, allProperties]);

  const handleSearch = (searchTerm) => {
    let filtered = [...allProperties];

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = applyFilters(filtered, filters);
    setFilteredProperties(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = (propertiesToFilter, currentFilters) => {
    let filtered = [...propertiesToFilter];

    if (currentFilters.type !== 'all') {
      filtered = filtered.filter(property => property.type === currentFilters.type);
    }

    if (currentFilters.status !== 'all') {
      filtered = filtered.filter(property => property.status === currentFilters.status);
    }

    filtered = filtered.filter(property =>
      property.price >= currentFilters.priceRange[0] &&
      property.price <= currentFilters.priceRange[1]
    );

    if (currentFilters.bedrooms !== 'any') {
      filtered = filtered.filter(property =>
        property.bedrooms >= parseInt(currentFilters.bedrooms)
      );
    }

    return filtered;
  };

  return (
    <div className="properties-page">
      <div className="properties-header">
        <h1>Available Properties</h1>
        <p>Find your perfect home from our curated selection</p>
      </div>

      <div className="properties-controls">
        <Search onSearch={handleSearch} />
        <Filter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="properties-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="no-results">
            <h3>No properties match your search criteria</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;