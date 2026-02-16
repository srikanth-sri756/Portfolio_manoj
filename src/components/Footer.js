import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

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

const columnVariants = {
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

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

const Footer = ({ theme = null }) => {
  const currentYear = new Date().getFullYear();
  
  const footerStyle = theme ? {
    background: `linear-gradient(180deg, ${theme.dark} 0%, ${theme.darker} 100%)`,
    borderTop: `1px solid ${theme.primary}15`
  } : {};

  const categories = [
    { key: 'events', name: 'Events' },
    { key: 'fashion', name: 'Fashion' },
    { key: 'portraits', name: 'Portraits' },
    { key: 'newborn', name: 'Newborn' },
    { key: 'pet', name: 'Pet' },
    { key: 'product', name: 'Product' },
    { key: 'sports', name: 'Sports' }
  ];

  const socialLinks = [
    { icon: '📷', label: 'Instagram', url: '#' },
    { icon: '📘', label: 'Facebook', url: '#' },
    { icon: '🎵', label: 'TikTok', url: '#' },
    { icon: '💼', label: 'LinkedIn', url: '#' }
  ];

  return (
    <motion.footer 
      className="footer"
      style={footerStyle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.div className="footer-container" variants={containerVariants}>
        {/* Brand Section */}
        <motion.div className="footer-brand" variants={columnVariants}>
          <motion.div 
            className="footer-logo"
            whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="logo-text">Sai Manoj</span>
            <span className="logo-accent">Madala</span>
          </motion.div>
          <motion.p 
            className="footer-tagline"
            variants={linkVariants}
          >
            Capturing life's precious moments with creativity, passion, and artistic vision.
          </motion.p>
          
          {/* Social Links */}
          <motion.div 
            className="social-links"
            variants={containerVariants}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className="social-link"
                variants={linkVariants}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                }}
                whileTap={{ scale: 0.9 }}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div className="footer-column" variants={columnVariants}>
          <motion.h4 
            className="footer-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quick Links
          </motion.h4>
          <motion.ul className="footer-links" variants={containerVariants}>
            {['Home', 'About', 'Portfolio', 'Contact'].map((link, i) => (
              <motion.li key={i} variants={linkVariants}>
                <motion.a 
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ x: 5, color: '#d4af37' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {link}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Categories */}
        <motion.div className="footer-column" variants={columnVariants}>
          <motion.h4 
            className="footer-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Categories
          </motion.h4>
          <motion.ul className="footer-links" variants={containerVariants}>
            {categories.slice(0, 4).map((cat) => (
              <motion.li key={cat.key} variants={linkVariants}>
                <motion.span whileHover={{ x: 5, color: '#d4af37' }}>
                  <Link to={`/category/${cat.key}`}>{cat.name}</Link>
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* More Categories */}
        <motion.div className="footer-column" variants={columnVariants}>
          <motion.h4 
            className="footer-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            More
          </motion.h4>
          <motion.ul className="footer-links" variants={containerVariants}>
            {categories.slice(4).map((cat) => (
              <motion.li key={cat.key} variants={linkVariants}>
                <motion.span whileHover={{ x: 5, color: '#d4af37' }}>
                  <Link to={`/category/${cat.key}`}>{cat.name}</Link>
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div className="footer-column footer-contact" variants={columnVariants}>
          <motion.h4 
            className="footer-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h4>
          <motion.div className="contact-info" variants={containerVariants}>
            {[
              { icon: '📧', text: 'madalasaimanoj478@gmail.com' },
              { icon: '📱', text: '+49 15214180630' },
              { icon: '📍', text: 'Berlin, Germany' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="contact-item"
                variants={linkVariants}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <span className="contact-icon">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="footer-bottom-content">
          <motion.p 
            className="copyright"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            © {currentYear} <span className="highlight">Sai Manoj Madala</span>. All rights reserved.
          </motion.p>
          <motion.div 
            className="footer-legal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a href="#privacy" whileHover={{ color: '#d4af37' }}>Privacy Policy</motion.a>
            <span className="divider">•</span>
            <motion.a href="#terms" whileHover={{ color: '#d4af37' }}>Terms of Service</motion.a>
          </motion.div>
        </div>
        <motion.p 
          className="made-with"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          Made with <motion.span 
            className="heart"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >❤️</motion.span> for capturing beautiful moments
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
