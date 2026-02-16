import React from 'react';
import '../styles/CategoryBackgroundEffects.css';

const CategoryBackgroundEffects = ({ categoryId, theme }) => {
  // Events - Confetti and Sparkles
  const EventsEffects = () => (
    <>
      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`confetti confetti-${i + 1}`} />
        ))}
      </div>
      <div className="sparkles-container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`sparkle sparkle-${i + 1}`} />
        ))}
      </div>
    </>
  );

  // Fashion - Light Rays and Runway Lines
  const FashionEffects = () => (
    <>
      <div className="light-container">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`light-ray light-ray-${i + 1}`} />
        ))}
      </div>
      <div className="runway-lines">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`runway-line runway-line-${i + 1}`} />
        ))}
      </div>
    </>
  );

  // Newborn - Feathers, Hearts, and Bubbles
  const NewbornEffects = () => (
    <>
      <div className="feathers-container">
        {[...Array(10)].map((_, i) => (
          <i key={i} className={`feather feather-${i + 1} fas fa-feather`} />
        ))}
      </div>
      <div className="hearts-container">
        {[...Array(5)].map((_, i) => (
          <i key={i} className={`heart heart-${i + 1} fas fa-heart`} />
        ))}
      </div>
      <div className="bubbles-container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`bubble bubble-${i + 1}`} />
        ))}
      </div>
    </>
  );

  // Pet - Paw Prints, Bouncing Balls, and Bones
  const PetEffects = () => (
    <>
      <div className="paws-container">
        {[...Array(10)].map((_, i) => (
          <i key={i} className={`paw paw-${i + 1} fas fa-paw`} />
        ))}
      </div>
      <div className="balls-container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`ball ball-${i + 1}`} />
        ))}
      </div>
      <div className="bones-container">
        {[...Array(3)].map((_, i) => (
          <i key={i} className={`bone bone-${i + 1} fas fa-bone`} />
        ))}
      </div>
    </>
  );

  // Portraits - Film Grain, Frames, Brush Strokes, Vignette
  const PortraitsEffects = () => (
    <>
      <div className="grain-overlay" />
      <div className="vignette" />
      <div className="frames-container">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`frame frame-${i + 1}`} />
        ))}
      </div>
      <div className="brushes-container">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`brush-stroke brush-stroke-${i + 1}`} />
        ))}
      </div>
    </>
  );

  // Product - Geometric Shapes, Grid Lines, Scanning Line
  const ProductEffects = () => (
    <>
      <div className="grid-container" />
      <div className="scan-line" />
      <div className="shapes-container">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`shape shape-${i + 1}`} />
        ))}
        {[...Array(2)].map((_, i) => (
          <div key={i + 4} className={`shape circle shape-${i + 5}`} />
        ))}
      </div>
    </>
  );

  // Sports - Speed Lines, Particles, Pulse Ring
  const SportsEffects = () => (
    <>
      <div className="speed-lines-container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`speed-line speed-line-${i + 1}`} />
        ))}
      </div>
      <div className="particles-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>
      <div className="pulse-ring" />
    </>
  );

  const renderEffects = () => {
    switch (categoryId) {
      case 'events':
        return <EventsEffects />;
      case 'fashion':
        return <FashionEffects />;
      case 'newborn':
        return <NewbornEffects />;
      case 'pet':
        return <PetEffects />;
      case 'portraits':
        return <PortraitsEffects />;
      case 'product':
        return <ProductEffects />;
      case 'sports':
        return <SportsEffects />;
      default:
        return null;
    }
  };

  return (
    <div className={`category-effects ${categoryId}-effects`}>
      {renderEffects()}
    </div>
  );
};

export default CategoryBackgroundEffects;
