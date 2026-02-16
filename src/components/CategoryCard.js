import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/CategoryCard.css';

const CategoryCard = ({ categoryKey, category, index }) => {
  const { name, icon, description, theme, images, animation } = category;

  // Get animation based on category type
  const getIconAnimation = () => {
    switch (animation?.type) {
      case 'celebration':
        return { y: [0, -15, 0], rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] };
      case 'elegant':
        return { y: [0, -8, 0], scale: [1, 1.05, 1] };
      case 'gentle':
        return { y: [0, -10, 0], rotate: [0, 3, -3, 0] };
      case 'playful':
        return { y: [0, -20, -5, -15, 0], rotate: [0, -8, 8, 0] };
      case 'artistic':
        return { y: [0, -12, 0], scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] };
      case 'polished':
        return { y: [0, -6, 0], scale: [1, 1.03, 1] };
      case 'dynamic':
        return { y: [0, -18, -5, -12, 0], scale: [1, 1.1, 0.98, 1.05, 1] };
      default:
        return { y: [0, -10, 0] };
    }
  };

  // Card animation variants
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
      rotateX: 15
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: 1000 }}
    >
      <Link to={`/category/${categoryKey}`} className="category-card-link">
        <motion.div 
          className="category-card"
          whileHover={{ 
            scale: 1.04,
            y: -15,
            rotateY: 5,
            rotateX: 5,
            boxShadow: `0 30px 60px ${theme.primary}40`,
            transition: {
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.darker} 100%)`,
            borderColor: `${theme.primary}30`,
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.div 
            className="card-icon"
            animate={getIconAnimation()}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.15 }}
            style={{ 
              background: theme.gradient || `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              boxShadow: `0 10px 30px ${theme.primary}50`
            }}
          >
            <span>{icon}</span>
          </motion.div>
          
          <motion.h3 
            className="card-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {name}
          </motion.h3>
          <motion.p 
            className="card-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="card-stats"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <span className="image-count" style={{ color: theme.primary }}>
              {images.length} Photos
            </span>
            <motion.span 
              className="view-more"
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              style={{ color: theme.accent }}
            >
              View Gallery →
            </motion.span>
          </motion.div>

          <motion.div 
            className="card-glow"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ 
              background: `radial-gradient(circle at center, ${theme.glow || theme.primary + '20'} 0%, transparent 70%)`
            }}
          />
          
          {/* Shine effect on hover */}
          <motion.div
            className="card-shine"
            initial={{ x: '-100%', opacity: 0 }}
            whileHover={{ x: '200%', opacity: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
