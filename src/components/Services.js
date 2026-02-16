import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Services.css';

const services = [
  {
    icon: 'fas fa-calendar-alt',
    title: 'Event Photography',
    description: 'Capturing the energy and emotions of your special events, from corporate gatherings to cultural celebrations.',
    color: '#9b59b6'
  },
  {
    icon: 'fas fa-camera-retro',
    title: 'Fashion Photography',
    description: 'High-end fashion shoots that bring out the beauty and elegance of every outfit and model.',
    color: '#f1c40f'
  },
  {
    icon: 'fas fa-baby',
    title: 'Newborn Photography',
    description: 'Gentle, artistic portraits of your newest family member in their first precious days.',
    color: '#e91e63'
  },
  {
    icon: 'fas fa-paw',
    title: 'Pet Photography',
    description: 'Fun and heartwarming portraits that capture the unique personality of your furry friends.',
    color: '#ff9800'
  },
  {
    icon: 'fas fa-user',
    title: 'Portrait Photography',
    description: 'Professional portraits that reveal your authentic self, perfect for personal or business use.',
    color: '#9c27b0'
  },
  {
    icon: 'fas fa-box',
    title: 'Product Photography',
    description: 'Stunning product images that make your merchandise stand out and drive sales.',
    color: '#00bcd4'
  },
  {
    icon: 'fas fa-running',
    title: 'Sports Photography',
    description: 'Dynamic action shots that freeze the most exciting moments in sports and athletics.',
    color: '#f44336'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    rotateX: 15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What I Offer
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Photography Services
          </motion.h2>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card"
              variants={cardVariants}
              whileHover={{ 
                y: -15,
                scale: 1.03,
                rotateX: 8,
                rotateY: 8,
                boxShadow: `0 30px 60px ${service.color}30`,
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
              }}
              whileTap={{ scale: 0.97 }}
              style={{ '--service-color': service.color }}
            >
              <motion.div 
                className="service-icon"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <i className={service.icon}></i>
              </motion.div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <motion.div 
                className="service-glow"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
