import React from 'react';
import { FaHome, FaSearch, FaHandshake, FaHeadset } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaHome className="service-icon" />,
      title: "Property Listings",
      description: "Access our extensive database of verified rental properties with detailed information and high-quality images."
    },
    {
      id: 2,
      icon: <FaSearch className="service-icon" />,
      title: "Advanced Search",
      description: "Filter properties by location, price, amenities, and more to find exactly what you're looking for."
    },
    {
      id: 3,
      icon: <FaHandshake className="service-icon" />,
      title: "Tenant Services",
      description: "We handle all the paperwork and negotiations to make your rental process smooth and stress-free."
    },
    {
      id: 4,
      icon: <FaHeadset className="service-icon" />,
      title: "24/7 Support",
      description: "Our dedicated support team is always available to answer your questions and resolve any issues."
    }
  ];

  return (
    <div className="services-grid">
      {services.map(service => (
        <div key={service.id} className="service-card">
          <div className="service-icon-container">
            {service.icon}
          </div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;