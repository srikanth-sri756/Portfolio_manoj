import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
  // Master timing configuration
  const timing = {
    badge: 0.2,
    firstName: 0.5,
    lastName: 0.8,
    subtitle: 1.1,
    buttons: 1.4,
    scroll: 1.8
  };

  // Smooth easing curves
  const smoothEase = [0.22, 1, 0.36, 1];
  const bounceEase = [0.34, 1.56, 0.64, 1];

  // Text reveal with elegant mask animation
  const textReveal = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -80,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: smoothEase
      }
    }
  };

  // Badge float in
  const badgeReveal = {
    hidden: { 
      opacity: 0, 
      y: -30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: bounceEase,
        delay: timing.badge
      }
    }
  };

  // Staggered letter animation for name
  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: smoothEase,
        delay: i * 0.03
      }
    })
  };

  // Button animations
  const buttonVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: smoothEase
      }
    },
    hover: { 
      scale: 1.05,
      y: -3,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    tap: { scale: 0.97 }
  };

  const firstName = "Sai Manoj";
  const lastName = "Madala";

  return (
    <section className="hero" id="home">
      {/* Background Image Layer */}
      <div 
        className="hero-bg-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/Product/IMG_8343.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          filter: 'blur(1px)',
          zIndex: 0
        }}
      />
      
      {/* Animated Background */}
      <div className="hero-bg">
        {/* Gradient overlay */}
        <motion.div 
          className="hero-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
        
        {/* Floating orbs */}
        <div className="floating-orbs">
          {[
            { size: 60, top: '15%', left: '10%', delay: 0 },
            { size: 40, top: '25%', right: '15%', delay: 0.5 },
            { size: 80, top: '60%', left: '5%', delay: 1 },
            { size: 50, top: '70%', right: '10%', delay: 1.5 },
            { size: 35, top: '40%', right: '25%', delay: 2 },
            { size: 45, bottom: '20%', left: '20%', delay: 2.5 }
          ].map((orb, i) => (
            <motion.div
              key={i}
              className="floating-orb"
              style={{
                width: orb.size,
                height: orb.size,
                top: orb.top,
                left: orb.left,
                right: orb.right,
                bottom: orb.bottom
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.15, 1],
                y: [0, -20 - i * 5, 0]
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: orb.delay
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Professional Badge */}
        <motion.div 
          className="hero-badge"
          variants={badgeReveal}
          initial="hidden"
          animate="visible"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 40px rgba(212, 175, 55, 0.3)",
            borderColor: "rgba(212, 175, 55, 0.6)"
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: timing.badge + 0.3, duration: 0.5 }}
          >
            Professional Photographer
          </motion.span>
        </motion.div>

        {/* Main Title with Letter Animation */}
        <div className="hero-title-wrapper">
          <motion.h1 
            className="hero-title"
            style={{ perspective: "1000px" }}
          >
            {/* First Name Line */}
            <motion.span 
              className="name-line"
              variants={textReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: timing.firstName }}
            >
              {firstName.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  initial="hidden"
                  animate="visible"
                  style={{ 
                    display: 'inline-block',
                    whiteSpace: letter === ' ' ? 'pre' : 'normal'
                  }}
                  transition={{ delay: timing.firstName + i * 0.04 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
            
            {/* Last Name Line with Accent */}
            <motion.span 
              className="name-line accent"
              variants={textReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: timing.lastName }}
            >
              {lastName.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  initial="hidden"
                  animate="visible"
                  style={{ display: 'inline-block' }}
                  transition={{ delay: timing.lastName + i * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ 
            delay: timing.subtitle, 
            duration: 1,
            ease: smoothEase
          }}
        >
          Capturing moments that tell your story. Specializing in events, 
          portraits, fashion, and creative photography.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: timing.buttons, duration: 0.5 }}
        >
          <motion.a 
            href="#portfolio" 
            className="btn btn-primary"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: timing.buttons }}
          >
            <span>View Portfolio</span>
            <motion.span 
              className="btn-arrow"
              initial={{ x: 0, opacity: 0.7 }}
              whileHover={{ x: 8, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.a>
          
          <motion.a 
            href="#contact" 
            className="btn btn-secondary"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: timing.buttons + 0.15 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator - positioned at bottom of hero section */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: timing.scroll, duration: 0.8, ease: smoothEase }}
      >
        <motion.div 
          className="scroll-content"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>Scroll Down</span>
          <motion.div 
            className="scroll-arrow"
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </motion.div>
        <motion.div 
          className="scroll-line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: timing.scroll + 0.3, duration: 0.6, ease: smoothEase }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
