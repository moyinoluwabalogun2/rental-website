import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Renter",
      content: "Found my dream apartment in just two days! The process was so smooth and the team was incredibly helpful throughout.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Owner",
      content: "As a landlord, I appreciate how professional and efficient RentalEstate is. They found me great tenants quickly.",
      rating: 4
    },
    {
      id: 3,
      name: "Emily Wilson",
      role: "Renter",
      content: "The most user-friendly rental platform I've used. The virtual tours saved me so much time in my search.",
      rating: 5
    }
  ];

  return (
    <div className="testimonials-grid">
      {testimonials.map(testimonial => (
        <div key={testimonial.id} className="testimonial-card">
          <FaQuoteLeft className="quote-icon" />
          <p className="testimonial-content">{testimonial.content}</p>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < testimonial.rating ? 'star filled' : 'star'} 
              />
            ))}
          </div>
          <div className="testimonial-author">
            <h4>{testimonial.name}</h4>
            <p>{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;