import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/DPJfd28jJQXMoKuw6?g_st=iw';

// ── Replace this with your Elfsight App ID ──────────────────────────
// 1. Go to https://elfsight.com and create a free account
// 2. Add a "Google Reviews" widget
// 3. Search your business on Google Maps and connect it
// 4. Copy the data-elfsight-app-id value and paste below
const ELFSIGHT_APP_ID = ''; // e.g. 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
// ─────────────────────────────────────────────────────────────────────

const Testimonials = () => {
  useEffect(() => {
    // Re-initialize Elfsight widget if script already loaded
    try {
      if (window.eapps && typeof window.eapps.initWidgets === 'function') {
        window.eapps.initWidgets();
      }
    } catch (e) {
      // Elfsight not fully loaded yet — it will self-initialize
    }
  }, []);

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
        <motion.div className="section-header" variants={fadeInUp}>
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
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Real reviews from our valued clients on Google
          </motion.p>
        </motion.div>

        <motion.div className="google-reviews-container" variants={fadeInUp}>
          {ELFSIGHT_APP_ID ? (
            <div className={`elfsight-app-${ELFSIGHT_APP_ID}`} />
          ) : (
            <div className="reviews-placeholder">
              <div className="placeholder-icon">
                <i className="fab fa-google"></i>
              </div>
              <h3>Google Reviews Coming Soon</h3>
              <p>Our Google Reviews widget is being set up. In the meantime, check out our reviews directly on Google!</p>
              <motion.a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="google-reviews-btn"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(212,175,55,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-google"></i>
                View Our Google Reviews
              </motion.a>
            </div>
          )}
        </motion.div>

        {ELFSIGHT_APP_ID && (
          <motion.div
            className="google-reviews-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="google-reviews-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(212,175,55,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-google"></i>
              See All Reviews on Google
            </motion.a>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Testimonials;
