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
priceRange: [0, 50000000], // [min, max]
bedrooms: 'any',
status: 'all'
});
const location = useLocation();

// Load properties from Firestore
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

// Filter properties on search or filter change
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

// Type filter
if (currentFilters.type !== 'all') {
filtered = filtered.filter(property => property.type === currentFilters.type);
}

// Status filter
if (currentFilters.status !== 'all') {
filtered = filtered.filter(property => property.status === currentFilters.status);
}

// Price range filter
if (currentFilters.priceRange && currentFilters.priceRange.length === 2) {
filtered = filtered.filter(property =>
property.price >= currentFilters.priceRange[0] &&
property.price <= currentFilters.priceRange[1]
);
}

// Bedrooms filter (if applicable)
if (currentFilters.singleRooms && currentFilters.singleRooms !== 'any') {
filtered = filtered.filter(property =>
property.singleRooms >= parseInt(currentFilters.singleRooms)
);
}

return filtered;
};

// Check if filters are at default values
const noFilterSelected =
filters.type === 'all' &&
filters.status === 'all' &&
filters.priceRange[0] === 0 &&
filters.priceRange[1] === 50000000 &&
(!filters.singleRooms || filters.singleRooms === 'any');

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

{noFilterSelected && (
<div className="no-filter">
<h3>No filter selected</h3>
<p>Showing all properties</p>
</div>
)}

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