import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/CustomCursor.css';

// Smooth interpolation function (outside component for stability)
const lerp = (start, end, factor) => start + (end - start) * factor;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationId;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const animateCursor = () => {
      // Smoother cursor movement with lerp
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.35);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.35);
      
      // Even smoother follower movement
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.12);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animationId = requestAnimationFrame(animateCursor);
    };

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll(
        'a, button, .category-card, .gallery-item, .social-link, .nav-link, .btn'
      );
      
      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    animateCursor();
    
    // Delay to ensure DOM is ready
    setTimeout(addHoverListeners, 500);
    
    // Re-add listeners when navigation happens
    const observer = new MutationObserver(() => {
      setTimeout(addHoverListeners, 100);
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  // Hide on mobile/touch devices
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return null;

  return (
    <>
      <motion.div 
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? 'visible' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
      />
      <motion.div 
        ref={followerRef}
        className={`cursor-follower ${isHovering ? 'hover' : ''} ${isVisible ? 'visible' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
      />
    </>
  );
};

export default CustomCursor;
