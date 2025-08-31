import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';


import './ContactAgent.css';






// Initialize EmailJS (replace with your actual public key)
emailjs.init('Zwtze-EBbB1wJzE4O');

const ContactAgent = ({ property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service_17luh1h',
        'template_fxfefmd',
        {
          ...formData,
          property_title: property.title,
          property_id: property.id
        }
      );
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-agent">
      <h3>Contact Agent</h3>
      <p>Interested in {property.title}? Contact us for more information.</p>
      
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="alert success">
          Message sent successfully!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="alert error">
          Failed to send message. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="agent-form">
        <div className="form-group">
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <div className="input-with-icon">
            <FaPhone className="input-icon" />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Your Phone" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <textarea 
            name="message" 
            placeholder="Your Message" 
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : (
            <>
              <FaPaperPlane /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactAgent;