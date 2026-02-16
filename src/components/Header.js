import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

// Animation variants
const headerVariants = {
  initial: { y: -100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const Header = ({ isHome = false, categoryName = '', theme = null }) => {
  const headerStyle = theme ? {
    background: `rgba(${hexToRgb(theme.dark)}, 0.95)`,
    borderBottom: `1px solid ${theme.primary}30`
  } : {};

  return (
    <motion.header 
      className={`header ${isHome ? 'header-home' : ''}`}
      style={headerStyle}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      {!isHome && (
        <motion.div variants={itemVariants}>
          <Link to="/" className="back-btn" style={theme ? { 
            background: theme.card,
            borderColor: `${theme.primary}40`
          } : {}}>
            <motion.span 
              className="back-icon"
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              ←
            </motion.span>
            <span>Back</span>
          </Link>
        </motion.div>
      )}
      
      <motion.div 
        className="logo"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          {isHome ? "Sai Manoj Maddala" : categoryName}
        </Link>
      </motion.div>
      
      {isHome && (
        <motion.nav 
          className="nav-links"
          variants={itemVariants}
        >
          {['About', 'Portfolio', 'Categories', 'Contact'].map((item, index) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2, color: '#9b59b6' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
};

// Helper function to convert hex to rgb
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '15, 15, 35';
};

export default Header;
