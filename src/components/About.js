import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 80, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
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

const About = () => {
  const stats = [
    { number: "150+", label: "Photos" },
    { number: "7", label: "Categories" },
    { number: "5+", label: "Years Experience" },
    { number: "100+", label: "Happy Clients" }
  ];

  return (
    <motion.section 
      className="about" 
      id="about"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="about-container">
        <motion.div 
          className="about-image"
          variants={slideInLeft}
        >
          <motion.div 
            className="image-frame"
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img 
              src={`${process.env.PUBLIC_URL}/images/sai-manoj.png`} 
              alt="Sai Manoj Madala"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <motion.div 
              className="frame-decoration"
              initial={{ opacity: 0, scale: 1.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="about-content"
          variants={slideInRight}
        >
          <motion.div 
            className="section-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            About Me
          </motion.div>
          
          <motion.h2 
            className="about-title"
            variants={fadeInUp}
          >
            Passionate About <span className="accent">Capturing</span> Life's Beautiful Moments
          </motion.h2>
          
          <motion.p 
            className="about-text"
            variants={fadeInUp}
          >
            I'm Sai Manoj Madala, a professional photographer with a passion for 
            capturing the essence of every moment. With expertise spanning events, 
            portraits, fashion, sports, newborn, pet, and product photography, 
            I bring creativity and technical excellence to every shoot.
          </motion.p>
          
          <motion.p 
            className="about-text"
            variants={fadeInUp}
          >
            My approach combines artistic vision with attention to detail, ensuring 
            each photograph tells a unique story. Whether it's the joy of a celebration, 
            the elegance of fashion, or the tenderness of a newborn, I strive to 
            create images that resonate with emotion and authenticity.
          </motion.p>

          <motion.div 
            className="stats-grid"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-item"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  boxShadow: '0 15px 40px rgba(155, 89, 182, 0.2)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="stat-number"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.5 + index * 0.1, 
                    type: "spring", 
                    stiffness: 200 
                  }}
                >
                  {stat.number}
                </motion.span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
