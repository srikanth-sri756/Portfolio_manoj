import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Gallery.css';

const Gallery = ({ images, folderPath, theme }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // Lightbox slide variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15
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
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? -15 : 15,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  // Button hover animation
  const buttonHover = {
    scale: 1.1,
    boxShadow: `0 10px 30px ${theme.primary}40`,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  };

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <motion.div
            key={`${folderPath}-${index}`}
            className="gallery-item"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ 
              scale: 1.04, 
              y: -15,
              boxShadow: `0 25px 50px rgba(0,0,0,0.5), 0 0 40px ${theme.primary}25`,
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openLightbox(index)}
            style={{
              background: theme.card,
              borderColor: `${theme.primary}20`
            }}
          >
            <div className="image-wrapper">
              <img 
                src={`/images/${folderPath}/${image}`} 
                alt={`${folderPath} ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => console.error('Failed to load:', e.target.src)}
              />
              <motion.div 
                className="overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `linear-gradient(transparent 30%, ${theme.darker}ee)`
                }}
              >
                <motion.span 
                  className="image-number" 
                  style={{ color: theme.primary }}
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
                <motion.span 
                  className="view-text"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  View Full
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Professional Lightbox */}
      <AnimatePresence mode="wait">
        {lightboxOpen && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            style={{ background: `${theme.darker}f5` }}
          >
            {/* Lightbox background blur */}
            <motion.div 
              className="lightbox-backdrop"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
            />

            <motion.button
              className="lightbox-btn close-btn"
              onClick={closeLightbox}
              whileHover={buttonHover}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              style={{ background: theme.card, borderColor: `${theme.primary}40` }}
            >
              ✕
            </motion.button>
            
            <motion.button
              className="lightbox-btn prev-btn"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              whileHover={buttonHover}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ delay: 0.15 }}
              style={{ background: theme.card, borderColor: `${theme.primary}40` }}
            >
              ‹
            </motion.button>
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentIndex}
                src={`/images/${folderPath}/${images[currentIndex]}`}
                alt={`${folderPath} ${currentIndex + 1}`}
                className="lightbox-image"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                style={{ perspective: 1000 }}
              />
            </AnimatePresence>
            
            <motion.button
              className="lightbox-btn next-btn"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              whileHover={buttonHover}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ delay: 0.15 }}
              style={{ background: theme.card, borderColor: `${theme.primary}40` }}
            >
              ›
            </motion.button>

            <motion.div 
              className="lightbox-counter" 
              style={{ color: theme.primary }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.25 }}
            >
              <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="separator">/</span>
              <span className="total">{String(images.length).padStart(2, '0')}</span>
            </motion.div>

            {/* Progress bar */}
            <motion.div 
              className="lightbox-progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (currentIndex + 1) / images.length }}
              transition={{ duration: 0.4 }}
              style={{ 
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                transformOrigin: 'left'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
