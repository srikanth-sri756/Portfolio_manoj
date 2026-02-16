import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <motion.section 
      className="contact" 
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
        >
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Let's Create Together
          </motion.h2>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            variants={slideInLeft}
          >
            {[
              { icon: 'fas fa-map-marker-alt', title: 'Location', text: 'Hyderabad, Telangana, India' },
              { icon: 'fas fa-envelope', title: 'Email', text: 'saimanoj.madala@email.com' },
              { icon: 'fas fa-phone', title: 'Phone', text: '+91 98765 43210' }
            ].map((info, index) => (
              <motion.div 
                key={index}
                className="info-card"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.03, 
                  x: 10,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div 
                  className="info-icon"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <i className={info.icon}></i>
                </motion.div>
                <div className="info-text">
                  <h4>{info.title}</h4>
                  <p>{info.text}</p>
                </div>
              </motion.div>
            ))}

            <motion.div 
              className="social-links"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              {[
                { icon: 'fab fa-instagram', delay: 0 },
                { icon: 'fab fa-facebook-f', delay: 0.05 },
                { icon: 'fab fa-twitter', delay: 0.1 },
                { icon: 'fab fa-linkedin-in', delay: 0.15 },
                { icon: 'fab fa-youtube', delay: 0.2 }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="social-link"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: social.delay, duration: 0.4 }}
                  whileHover={{ 
                    scale: 1.25, 
                    rotate: index % 2 === 0 ? 10 : -10,
                    boxShadow: '0 8px 25px rgba(212,175,55,0.4)'
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form"
            variants={slideInRight}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={formData.name ? 'has-value' : ''}
                  />
                  <label>Your Name</label>
                  <span className="focus-border"></span>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={formData.email ? 'has-value' : ''}
                  />
                  <label>Your Email</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="form-group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={formData.service ? 'has-value' : ''}
                >
                  <option value="" disabled></option>
                  <option value="events">Event Photography</option>
                  <option value="fashion">Fashion Photography</option>
                  <option value="newborn">Newborn Photography</option>
                  <option value="pet">Pet Photography</option>
                  <option value="portraits">Portrait Photography</option>
                  <option value="product">Product Photography</option>
                  <option value="sports">Sports Photography</option>
                </select>
                <label>Service Interested In</label>
                <span className="focus-border"></span>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className={formData.message ? 'has-value' : ''}
                ></textarea>
                <label>Your Message</label>
                <span className="focus-border"></span>
              </div>

              <motion.button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${submitted ? 'submitted' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {submitted ? (
                  <>
                    <span>Message Sent!</span>
                    <i className="fas fa-check"></i>
                  </>
                ) : isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <i className="fas fa-spinner fa-spin"></i>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
