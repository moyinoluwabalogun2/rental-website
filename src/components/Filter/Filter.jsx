import React from 'react';
import './Filter.css';

const Filter = ({ filters, onFilterChange }) => {
  const handleTypeChange = (e) => {
    onFilterChange({ ...filters, type: e.target.value });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, priceRange: [0, parseInt(e.target.value)] });
  };

 

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  return (
    <div className="filter">
      <h3>Filter Properties</h3>
      
      <div className="filter-group">
        <label>Property Type</label>
        <select value={filters.type} onChange={handleTypeChange}>
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
           <option value="self contain rooms and single rooms">self contain rooms and single rooms</option>
            <option value="single rooms">single rooms</option>
            <option value="self contain rooms">self contain rooms</option>
            <option value="room and parlour">room and parlour</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Max Price: #{filters.priceRange[1].toLocaleString()}</label>
        <input 
          type="range" 
          min="500" 
          max="50000000" 
          step="100" 
          value={filters.priceRange[1]} 
          onChange={handlePriceChange}
        />
        <div className="price-range">
          <span>#500</span>---
          <span>#50,000,000</span>
        </div>
      </div>
      
      
      
      <div className="filter-group">
        <label>Status</label>
        <select value={filters.status} onChange={handleStatusChange}>
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;