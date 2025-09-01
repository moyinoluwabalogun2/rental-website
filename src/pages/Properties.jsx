import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import Filter from '../components/Filter/Filter';
import Search from '../components/Search/Search';
import { useLocation } from 'react-router-dom';
import { fetchAllProperties } from '../firebaseUtils';
import './Properties.css';

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: [0, 50000000],
    singleRooms: 'any',
    status: 'all'
  });

  const location = useLocation();

  // Load all properties from Firestore
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

  // Filter properties whenever filters, location, or allProperties change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');

    let filtered = [...allProperties];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply custom filters
    filtered = applyFilters(filtered, filters);
    setFilteredProperties(filtered);
  }, [location.search, filters, allProperties]);

  // Handle search from Search component
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

  // Update filters
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters function
  const applyFilters = (propertiesToFilter, currentFilters) => {
    let filtered = [...propertiesToFilter];

    // Filter by type
    if (currentFilters.type !== 'all') {
      filtered = filtered.filter(property => property.type === currentFilters.type);
    }

    // Filter by status
    if (currentFilters.status !== 'all') {
      filtered = filtered.filter(property => property.status === currentFilters.status);
    }

    // Filter by price (support single price and ranges)
    filtered = filtered.filter(property => {
      if (!property.price) return false;

      if (typeof property.price === 'string' && property.price.includes("-")) {
        const [min, max] = property.price.split("-").map(p => Number(p.trim()));
        return max >= currentFilters.priceRange[0] && min <= currentFilters.priceRange[1];
      }

      const priceNum = Number(property.price);
      return priceNum >= currentFilters.priceRange[0] && priceNum <= currentFilters.priceRange[1];
    });

    // Filter by singleRooms
    if (currentFilters.singleRooms && currentFilters.singleRooms !== 'any') {
      filtered = filtered.filter(property =>
        Number(property.singleRooms) >= parseInt(currentFilters.singleRooms)
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

