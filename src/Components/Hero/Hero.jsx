import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../Modal';
import './Hero.css';

const Hero = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const currentMovie = movies[currentIndex];
  
  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setPrevIndex(currentIndex);
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [currentIndex, isTransitioning, movies.length]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 7000);

    return () => clearInterval(intervalId);
  }, [goToNextSlide]);
  
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setPrevIndex(currentIndex);
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="hero">
        <div className="hero-slider">
          {movies.map((movie, index) => (
            <div 
              key={movie.name} 
              className={`hero-slide ${index === currentIndex ? 'active' : ''} ${index === prevIndex ? 'prev' : ''}`}
              style={{ backgroundImage: `url(${movie.poster})` }}
            >
              <div className="hero-slide-overlay"></div>
            </div>
          ))}
        </div>
        
        <div className="hero-content">
          <div className="hero-content-container">
            <div className="hero-details">
              <h1 className="hero-title">{currentMovie?.name}</h1>
              
              <div className="hero-meta">
                <span className="hero-year">{currentMovie?.year}</span>
                <span className="hero-rating">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="#FFD700" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  {currentMovie?.rating.toFixed(1)}
                </span>
                <div className="hero-categories">
                  {currentMovie?.categories.slice(0, 3).map((category, index) => (
                    <span key={index} className="hero-category">{category}</span>
                  ))}
                </div>
              </div>
              
              <p className="hero-description">{currentMovie?.description}</p>
              
              <div className="hero-actions">
                <button 
                  className="hero-button primary"
                  onClick={handleOpenModal}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Trailer
                </button>
                <button className="hero-button">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Add to List
                </button>
              </div>
            </div>
            
            <div className="hero-poster">
              <div className="hero-poster-container">
                <img src={currentMovie?.poster} alt={currentMovie?.name} />
                <div className="hero-poster-reflection"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-navigation">
          {movies.map((_, index) => (
            <button 
              key={index} 
              className={`hero-nav-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <Modal 
          movie={currentMovie} 
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Hero;
