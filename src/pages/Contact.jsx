import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import { emailjsConfig } from '../emailjsConfig';
import './Contact.css';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      property: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
      message: Yup.string().required('Required'),
      property: Yup.string()
    }),
    onSubmit: (values, { resetForm }) => {
      emailjs.send(
        emailjsConfig.serviceID,
        emailjsConfig.templateID,
        values,
        emailjsConfig.userID
      )
      .then(() => {
        setSubmitStatus('success');
        resetForm();
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch(() => {
        setSubmitStatus('error');
      });
    }
  });

  // WhatsApp number and formatted message
  const whatsappNumber = '+447983788435'; // ✅ Replace with your number
  const whatsappMessage = encodeURIComponent(
    `Hello, my name is ${formik.values.name}. I’m interested in ${formik.values.property || 'a property'}.\n\nMessage: ${formik.values.message}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Have questions? Send us a message and we'll get back to you soon.</p>
      
      {submitStatus === 'success' && (
        <div className="alert success">
          Message sent successfully! We'll contact you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="alert error">
          There was an error sending your message. Please try again.
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="error-message">{formik.errors.phone}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="property">Property Interested In</label>
          <input
            id="property"
            name="property"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.property}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message && (
            <div className="error-message">{formik.errors.message}</div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="submit-button" 
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* ✅ WhatsApp Button */}
      <div className="whatsapp-section">
        <a 
          href={whatsappLink}
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
          disabled={!formik.values.name || !formik.values.message}
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Contact;
