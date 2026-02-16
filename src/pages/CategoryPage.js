import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import CategoryBackgroundEffects from '../components/CategoryBackgroundEffects';
import { categories, getFolderPath } from '../data/imageData';
import '../styles/CategoryPage.css';

// Professional page animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      when: "beforeChildren"
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Hero content stagger
const heroStagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Fade up with spring
const fadeUpSpring = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Scale fade in
const scaleFade = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categories[categoryId];

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const { name, icon, description, theme, images, animation } = category;
  const folderPath = getFolderPath(categoryId);

  // Animation variants based on category type
  const getIconAnimation = () => {
    switch (animation.type) {
      case 'celebration':
        return { y: [0, -20, 0], rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] };
      case 'elegant':
        return { y: [0, -8, 0], scale: [1, 1.02, 1] };
      case 'gentle':
        return { y: [0, -10, 0], rotate: [0, 3, -3, 0] };
      case 'playful':
        return { y: [0, -25, -5, -20, 0], rotate: [0, -5, 5, 0] };
      case 'artistic':
        return { y: [0, -12, 0], scale: [1, 1.05, 1], rotate: [0, -3, 3, 0] };
      case 'polished':
        return { y: [0, -8, 0], scale: [1, 1.03, 1] };
      case 'dynamic':
        return { y: [0, -15, -5, -10, 0], scale: [1, 1.15, 0.95, 1.1, 1] };
      default:
        return { y: [0, -15, 0] };
    }
  };

  return (
    <motion.div 
      className={`category-page ${categoryId}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        background: `linear-gradient(180deg, ${theme.dark} 0%, ${theme.darker} 100%)`,
        '--primary': theme.primary,
        '--secondary': theme.secondary,
        '--accent': theme.accent,
        '--dark': theme.dark,
        '--darker': theme.darker,
        '--card': theme.card,
        '--glow': theme.glow
      }}
    >
      {/* Category-specific Background Effects */}
      <CategoryBackgroundEffects categoryId={categoryId} theme={theme} />

      {/* Background Effects */}
      <div className="page-bg">
        <motion.div 
          className="glow glow-1" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{ background: `radial-gradient(circle, ${theme.primary}20 0%, transparent 70%)` }}
        />
        <motion.div 
          className="glow glow-2" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 0.8
          }}
          style={{ background: `radial-gradient(circle, ${theme.secondary}15 0%, transparent 70%)` }}
        />
        <motion.div 
          className="glow glow-3" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.4, 1], 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 1.1
          }}
          style={{ background: `radial-gradient(circle, ${theme.accent}10 0%, transparent 70%)` }}
        />
      </div>

      <Header categoryName={name} theme={theme} />

      {/* Hero Section */}
      <section className="category-hero">
        <motion.div 
          className="hero-content"
          variants={heroStagger}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="hero-icon"
            variants={scaleFade}
            animate={getIconAnimation()}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              background: theme.gradient || `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              boxShadow: `0 20px 60px ${theme.primary}60`
            }}
          >
            <span>{icon}</span>
          </motion.div>

          <motion.h1
            variants={fadeUpSpring}
            style={{ textShadow: `0 0 40px ${theme.primary}40` }}
          >
            {name} Photography
          </motion.h1>

          <motion.p variants={fadeUpSpring}>
            {description}
          </motion.p>

          <motion.div 
            className="image-count"
            variants={scaleFade}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: `0 15px 40px ${theme.primary}30`,
              transition: { duration: 0.3 }
            }}
            style={{ 
              background: theme.card,
              borderColor: `${theme.primary}30`,
              boxShadow: `0 10px 30px ${theme.primary}20`
            }}
          >
            <motion.span 
              className="count" 
              style={{ color: theme.primary }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              {images.length}
            </motion.span>
            <span className="label">Photos in Collection</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <motion.section 
        className="gallery-section"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.6,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        <div className="gallery-container">
          <Gallery 
            images={images} 
            folderPath={folderPath} 
            theme={theme}
          />
        </div>
      </motion.section>

      <Footer theme={theme} />
    </motion.div>
  );
};

export default CategoryPage;
