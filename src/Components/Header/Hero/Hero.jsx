import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.css';

const SLIDE_INTERVAL = 8000; // 8 seconds

const Hero = ({ movies, onMovieClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, movies.length]);

  const nextSlide = () => {
    if (isTransitioning || movies.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning || movies.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  if (!movies || movies.length === 0) {
    return <div className="hero hero-empty"></div>;
  }

  const currentMovie = movies[currentIndex];
  
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${currentMovie.backdropImage || currentMovie.image})`,
  };

  return (
    <div className="hero" style={backgroundStyle}>
      <div className="hero-container">
        <div className="hero-info">
          <h1 className="hero-title">{currentMovie.title}</h1>
          <div className="hero-meta">
            <span className="hero-year">{currentMovie.year}</span>
            <span className="hero-rating">★ {currentMovie.rating?.toFixed(1)}</span>
            {currentMovie.runtime && (
              <span className="hero-runtime">{currentMovie.runtime} {t('minutes')}</span>
            )}
          </div>
          <p className="hero-description">
            {currentMovie.plot || 'No description available.'}
          </p>
          <div className="hero-actions">
            <button 
              className="hero-button primary"
              onClick={() => onMovieClick(currentMovie)}
            >
              {t('moreDetails')}
            </button>
            {currentMovie.trailerUrl && (
              <button 
                className="hero-button secondary"
                onClick={() => console.log('Play trailer', currentMovie.trailerUrl)}
              >
                <span className="play-icon">▶</span> {t('trailer')}
              </button>
            )}
          </div>
          
          {/* Left side navigation */}
          <div className="hero-navigation">
            <button 
              className="hero-nav-button prev"
              onClick={prevSlide}
              aria-label="Previous movie"
            >
              <span className="nav-icon">←</span> {t('prev')}
            </button>
            <div className="hero-dots">
              {movies.slice(0, 10).map((_, index) => (
                <button
                  key={index}
                  className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className="hero-nav-button next"
              onClick={nextSlide}
              aria-label="Next movie"
            >
              {t('next')} <span className="nav-icon">→</span>
            </button>
          </div>
        </div>
        
        <div className="hero-poster">
          <div className={`movie-card-3d ${isTransitioning ? 'transitioning' : ''}`}>
            <img 
              src={currentMovie.image || '/images/default-movie.jpg'} 
              alt={currentMovie.title} 
              className="movie-poster-img"
            />
            <div className="movie-card-reflection"></div>
            
            {/* Right side navigation */}
            <div className="poster-navigation">
              <button 
                className="poster-nav prev" 
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button 
                className="poster-nav next" 
                onClick={nextSlide}
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;