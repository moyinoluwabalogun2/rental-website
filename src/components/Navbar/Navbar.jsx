import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import MobileNavToggle from './MobileNavToggle.jsx';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <span>Rental</span>Estate
        </Link>

        <MobileNavToggle isOpen={isOpen} toggle={toggleMenu} />

        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/properties" className="navbar-link" onClick={() => setIsOpen(false)}>
            Properties
          </Link>
          <Link to="/about" className="navbar-link" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="navbar-link" onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          <div className="navbar-auth">
            {currentUser && role === 'admin' && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="navbar-link"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <button onClick={handleLogout} className="navbar-cta">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
