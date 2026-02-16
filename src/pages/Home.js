import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import { categories } from '../data/imageData';
import '../styles/Home.css';

/* ── Smooth easing ── */
const ease = [0.16, 1, 0.3, 1];

/* ── Reusable section-wrapper that fades + slides on scroll ── */
const SectionWrap = ({ children, direction = 'up', delay = 0 }) => {
  const dirMap = {
    up:    { opacity: 0, y: 100 },
    down:  { opacity: 0, y: -80 },
    left:  { opacity: 0, x: -100 },
    right: { opacity: 0, x: 100 },
    scale: { opacity: 0, scale: 0.88 },
  };

  return (
    <motion.div
      initial={dirMap[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 1, delay, ease }}
      viewport={{ once: true, amount: 0.08 }}
    >
      {children}
    </motion.div>
  );
};

/* ── Stagger wrapper for grids ── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};

const cardUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease }
  }
};

const imgReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease }
  })
};

const Home = () => {
  const categoryKeys = Object.keys(categories);

  const featuredImages = [
    { folder: 'Events', image: '082A1436.JPG' },
    { folder: 'Fashion', image: '082A0435.jpg' },
    { folder: 'portraits', image: '082A1939.jpg' },
    { folder: 'Newborn', image: '_MG_3285.jpg' },
    { folder: 'pet', image: 'IMG_0141.jpg' },
    { folder: 'Sports', image: '082A5145.jpg' },
    { folder: 'Product', image: '082A1219-2.jpg' },
    { folder: 'Events', image: 'IMG_8790.jpg' },
  ];

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header isHome={true} />
      <Hero />

      {/* ─── About  ── slides up ─── */}
      <SectionWrap direction="up">
        <About />
      </SectionWrap>

      {/* ─── Portfolio Preview ── scales in ─── */}
      <SectionWrap direction="scale">
        <section className="portfolio-preview" id="portfolio">
          <div className="section-container">
            {/* Header */}
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span
                className="section-badge"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                viewport={{ once: true }}
              >
                My Work
              </motion.span>
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                viewport={{ once: true }}
              >
                Featured <span className="accent">Portfolio</span>
              </motion.h2>
              <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                viewport={{ once: true }}
              >
                A glimpse of my photography work across various categories
              </motion.p>
            </motion.div>

            {/* Grid */}
            <motion.div
              className="featured-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {featuredImages.map((item, index) => (
                <motion.div
                  key={index}
                  className={`featured-item item-${index + 1}`}
                  custom={index}
                  variants={imgReveal}
                  whileHover={{
                    scale: 1.04,
                    zIndex: 10,
                    transition: { duration: 0.35, ease }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${item.folder}/${encodeURIComponent(item.image)}`}
                    alt={`Featured ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <motion.div
                    className="featured-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>{item.folder}</span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </SectionWrap>

      {/* ─── Categories ── slides from left ─── */}
      <SectionWrap direction="left">
        <section className="categories-section" id="categories">
          <div className="section-container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span
                className="section-badge"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                viewport={{ once: true }}
              >
                Explore
              </motion.span>
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                viewport={{ once: true }}
              >
                Browse <span className="accent">Categories</span>
              </motion.h2>
              <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                viewport={{ once: true }}
              >
                Discover my work across different photography genres
              </motion.p>
            </motion.div>

            <motion.div
              className="categories-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {categoryKeys.map((key, index) => (
                <motion.div key={key} variants={cardUp}>
                  <CategoryCard
                    categoryKey={key}
                    category={categories[key]}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </SectionWrap>

      {/* ─── Services ── slides from right ─── */}
      <SectionWrap direction="right">
        <Services />
      </SectionWrap>

      {/* ─── Testimonials ── slides up ─── */}
      <SectionWrap direction="up">
        <Testimonials />
      </SectionWrap>

      {/* ─── Contact ── slides from left ─── */}
      <SectionWrap direction="left">
        <Contact />
      </SectionWrap>

      {/* ─── Footer ── slides up ─── */}
      <SectionWrap direction="up" delay={0.1}>
        <Footer />
      </SectionWrap>
    </motion.div>
  );
};

export default Home;
