import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './MobileNavToggle.css';

const MobileNavToggle = ({ isOpen, toggle }) => {
  return (
    <button className="mobile-nav-toggle" onClick={toggle} aria-label="Toggle navigation">
      {isOpen ? (
        <FaTimes className="toggle-icon" />
      ) : (
        <FaBars className="toggle-icon" />
      )}
    </button>
  );
};

export default MobileNavToggle;