import React from 'react';
import './About.css';
import teamImage from '../pictures/teamimage1.jpg';
import valuesImage from '../pictures/values3.jpg';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About LivingSprings</h1>
          <p>Your trusted partner in finding the perfect home</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Living spring properties is a subsidiary of living spring Group,Founded in 2020,
                to make renting homes Hostels for students easier and more transparent
                . What started as a small team 
                of passionate real estate professionals has grown into a trusted platform 
                serving thousands of renters across the country.
              </p>
              <p>
                We've revolutionized the rental process by combining cutting-edge 
                technology with personalized service, creating an experience that puts 
                people first.
              </p>
            </div>
            <div className="about-image">
              <img src={teamImage} alt="Our team working together" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-section values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="about-grid reverse">
            <div className="about-image">
              <img src={valuesImage} alt="Our core values" />
            </div>
            <div className="about-text">
              <div className="value-item">
                <h3>Integrity</h3>
                <p>
                  We believe in doing business with honesty and transparency. 
                  What you see is what you get with our properties.
                </p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>
                  We're constantly improving our platform to make your rental 
                  experience smoother and more enjoyable.
                </p>
              </div>
              <div className="value-item">
                <h3>Community</h3>
                <p>
                  We're not just about properties - we're about helping people 
                  find homes where they can thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-imagee"></div>
              <h3>Mr Balogun Tajudeen</h3>
              <p className="position">CEO & Founder</p>
              <p className="bio">
                With over 15 years in real estate, MR Balogun founded RentalEstate to 
                solve the pain points he experienced in the rental market.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image"></div>
              <h3>Alhaji sanni</h3>
              <p className="position">Head of Operations</p>
              <p className="bio">
                Alhaji Sanni ensures every property meets our high standards and that our 
                clients receive exceptional service.
              </p>
            </div>
            <div className="team-member">
              <div className="member-imageee"></div>
              <h3>Mrs Ayodele Balogun</h3>
              <p className="position">Technology Director</p>
              <p className="bio">
                Mrs Ayodele leads our tech team in creating innovative solutions to 
                simplify the rental process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to find your perfect home?</h2>
          <p>Browse our properties or contact us for personalized assistance.</p>
          <div className="cta-buttons">
            <a href="/properties" className="cta-button primary">View Properties</a>
            <a href="/contact" className="cta-button secondary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;