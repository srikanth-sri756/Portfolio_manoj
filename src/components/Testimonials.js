import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Testimonials.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? -30 : 30
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction < 0 ? -30 : 30,
    transition: {
      duration: 0.4
    }
  })
};

const testimonials = [
  {
    quote: "Manoj captured our wedding beautifully! Every emotion, every moment was preserved perfectly. We couldn't be happier!",
    name: "Priya Sharma",
    service: "Event Photography",
    avatar: "PS"
  },
  {
    quote: "Working with Manoj for our fashion campaign was incredible. His eye for detail and lighting is unmatched.",
    name: "Rahul Kapoor",
    service: "Fashion Photography",
    avatar: "RK"
  },
  {
    quote: "The product shots transformed our e-commerce store. Sales increased by 40% after using Manoj's photographs!",
    name: "Arjun Mehta",
    service: "Product Photography",
    avatar: "AM"
  },
  {
    quote: "Amazing newborn photos! Manoj was so patient and gentle with our baby. The photos are absolutely magical.",
    name: "Sneha Reddy",
    service: "Newborn Photography",
    avatar: "SR"
  },
  {
    quote: "My pet portraits exceeded all expectations. Manoj captured my dog's personality perfectly!",
    name: "Vikram Singh",
    service: "Pet Photography",
    avatar: "VS"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = React.useCallback((newDirection) => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + newDirection + testimonials.length) % testimonials.length;
      return newIndex;
    });
    setDirection(newDirection);
  }, []);

  const nextTestimonial = () => paginate(1);
  const prevTestimonial = () => paginate(-1);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <motion.section 
      className="testimonials" 
      id="testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
            Client Love
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            What People Say
          </motion.h2>
        </motion.div>

        <motion.div 
          className="testimonials-container"
          variants={fadeInUp}
        >
          <div className="testimonials-slider">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                className="testimonial-card"
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div 
                  className="quote-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <i className="fas fa-quote-left"></i>
                </motion.div>
                <motion.p 
                  className="quote-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{testimonials[currentIndex].quote}"
                </motion.p>
                <motion.div 
                  className="client-info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div 
                    className="client-avatar"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span>{testimonials[currentIndex].avatar}</span>
                  </motion.div>
                  <div className="client-details">
                    <h5>{testimonials[currentIndex].name}</h5>
                    <span>{testimonials[currentIndex].service}</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div 
            className="testimonial-nav"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              className="nav-btn prev"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.15, x: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-chevron-left"></i>
            </motion.button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={index === currentIndex ? { scale: 1.2 } : { scale: 1 }}
                />
              ))}
            </div>
            <motion.button 
              className="nav-btn next"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.15, x: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-chevron-right"></i>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
