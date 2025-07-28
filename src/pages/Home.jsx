import React from 'react';
import Hero from '../components/Hero/Hero';
import FeaturedProperties from '../components/FeaturedProperties/FeaturedProperties';
import Testimonials from '../components/Testimonials/Testimonials';
import Services from '../components/Services/Services';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">Discover our premium selection</p>
          <FeaturedProperties />
        </div>
      </section>
      
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">How we can help you</p>
          <Services />
        </div>
      </section>
      
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Trusted by thousands of renters</p>
          <Testimonials />
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Dream Home?</h2>
          <p>Browse our properties or contact us for personalized assistance</p>
          <div className="cta-buttons">
            <a href="/properties" className="cta-button primary">View Properties</a>
            <a href="/contact" className="cta-button secondary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;