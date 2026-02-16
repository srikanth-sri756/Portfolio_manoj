import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Loader.css';

const Loader = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadComplete) onLoadComplete();
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onLoadComplete]);

  // Exit animation variants
  const exitVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        duration: 0.6, 
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Curtain exit animation
  const curtainVariants = {
    initial: { scaleY: 1 },
    exit: { 
      scaleY: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div 
          className="loader"
          variants={exitVariants}
          initial="visible"
          exit="exit"
        >
          {/* Background gradient animation */}
          <motion.div 
            className="loader-bg"
            animate={{
              background: [
                'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
                'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)',
                'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="loader-content">
            <motion.div 
              className="loader-camera"
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ 
                scale: 1,
                rotateY: [0, 360],
              }}
              transition={{ 
                scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
                rotateY: { duration: 4, repeat: Infinity, ease: "linear", delay: 0.8 }
              }}
            >
              <motion.div 
                className="camera-icon"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="camera-body-loader">
                  <motion.div 
                    className="camera-lens-loader"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(155, 89, 182, 0.3)',
                        '0 0 40px rgba(155, 89, 182, 0.6)',
                        '0 0 20px rgba(155, 89, 182, 0.3)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div 
                    className="camera-flash-loader"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="loader-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.span 
                className="loader-name"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Sai Manoj Madala
              </motion.span>
              <motion.span 
                className="loader-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Photography
              </motion.span>
            </motion.div>

            <motion.div 
              className="loader-progress"
              initial={{ opacity: 0, width: '0%' }}
              animate={{ opacity: 1, width: '200px' }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div 
                className="progress-bar"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
              <motion.span 
                className="progress-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8 }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.span>
            </motion.div>
          </div>

          {/* Exit curtains */}
          <motion.div 
            className="loader-curtain top"
            variants={curtainVariants}
            initial="initial"
            exit="exit"
            style={{ transformOrigin: 'top' }}
          />
          <motion.div 
            className="loader-curtain bottom"
            variants={curtainVariants}
            initial="initial"
            exit="exit"
            style={{ transformOrigin: 'bottom' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
