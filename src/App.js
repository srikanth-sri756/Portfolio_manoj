import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import './styles/App.css';
import './styles/PageTransition.css';

// Smooth easing curve used globally
const smoothEasing = [0.43, 0.13, 0.23, 0.96];

// Page transition wrapper
const PageWrapper = ({ children }) => {
  return (
    <>
      {/* Transition curtains */}
      <motion.div
        className="page-transition-overlay"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ 
          duration: 0.6,
          ease: smoothEasing
        }}
        style={{ transformOrigin: 'top', willChange: 'transform' }}
      />
      <motion.div
        className="page-transition-overlay secondary"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ 
          duration: 0.6,
          delay: 0.08,
          ease: smoothEasing
        }}
        style={{ transformOrigin: 'top', willChange: 'transform' }}
      />
      {children}
    </>
  );
};

// Animated Routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          } 
        />
        <Route 
          path="/category/:categoryId" 
          element={
            <PageWrapper>
              <CategoryPage />
            </PageWrapper>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <MotionConfig reducedMotion="never">
      <Loader />
      <CustomCursor />
      <Router>
        <AnimatedRoutes />
      </Router>
    </MotionConfig>
  );
}

export default App;
