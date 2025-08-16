import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Living spring</h3>
          <p>Find your perfect home with our curated selection of properties across the country.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><i className="fas fa-envelope"></i>bolsimfarmss@gmail.com</p>
          <p><i className="fas fa-phone"></i>+447983788435 </p>
          <p><i className="fas fa-map-marker-alt">no 1,ojuri close, ijagun,ijebu-ode</i></p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LivingSpring. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;