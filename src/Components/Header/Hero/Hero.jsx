import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/ModalContext';
import './Hero.css';

const Hero = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const { openModal } = useModal();
  const navigate = useNavigate();
  
  const topMovies = React.useMemo(() => {
    if (!movies || !movies.length) return [];
    return [...movies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }, [movies]);
  
  const currentMovie = topMovies[activeIndex];
  
  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);
  
  const goToPrevious = useCallback(() => {
    if (topMovies.length <= 1) return;
    
    const newIndex = activeIndex === 0 ? topMovies.length - 1 : activeIndex - 1;
    goToSlide(newIndex);
  }, [activeIndex, topMovies.length, goToSlide]);
  
  const goToNext = useCallback(() => {
    if (topMovies.length <= 1) return;
    
    const newIndex = (activeIndex + 1) % topMovies.length;
    goToSlide(newIndex);
  }, [activeIndex, topMovies.length, goToSlide]);
  
  useEffect(() => {
    let interval;
    if (isAutoPlaying && topMovies.length > 1) {
      interval = setInterval(() => {
        if (!isAnimating) {
          goToNext();
        }
      }, 8000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, activeIndex, isAnimating, topMovies.length, goToNext]);
  

  const handleNavigationInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  }, []);
  
  const handleWatchTrailer = useCallback(async () => {
    if (currentMovie) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${currentMovie.id}/videos?api_key=b7d67803bfe63c328cd9d3489707cc2a`
        );
        const data = await response.json();
        const trailer = data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        
        if (trailer) {
          openModal({
            ...currentMovie,
            showTrailer: true,
            trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`
          });
        } else {
          // If no trailer found, open modal with movie info
          openModal(currentMovie);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        // Fallback to opening modal with movie info
        openModal(currentMovie);
      }
    }
  }, [currentMovie, openModal]);

  const handleMoreInfo = useCallback(() => {
    if (currentMovie) {
      navigate(`/movie/${currentMovie.id}`);
    }
  }, [currentMovie, navigate]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
        handleNavigationInteraction();
      } else if (e.key === 'ArrowRight') {
        goToNext();
        handleNavigationInteraction();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToPrevious, goToNext, handleNavigationInteraction]);
  
  if (!currentMovie) {
    return <div className="hero hero-empty">Loading top movies...</div>;
  }
  
  return (
    <div className="hero">
      <div className="hero-backdrop">
        <div 
          className="hero-backdrop-image"
          style={{ backgroundImage: `url(${currentMovie.image})` }}
        />
        <div className="hero-backdrop-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-info">
          <h1 className="hero-title">{currentMovie.title}</h1>
          
          <div className="hero-meta">
            <div className="hero-rating">
              <span>★</span>
              <span>{currentMovie.rating.toFixed(1)}</span>
            </div>
            <div className="hero-year">{currentMovie.year}</div>
            <div className="hero-runtime">
              {Math.floor(currentMovie.runtime / 60)}h {currentMovie.runtime % 60}m
            </div>
          </div>
          
          <div className="hero-categories">
            {currentMovie.categories.map((category, index) => (
              <span key={index} className="hero-category">
                {category}
              </span>
            ))}
          </div>
          
          <p className="hero-description">
            {currentMovie.plot}
          </p>
          
          <div className="hero-actions">
            <button 
              className="hero-button primary"
              onClick={handleWatchTrailer}
              aria-label="Watch trailer"
            >
              <span>▶</span> Watch Trailer
            </button>
            <button 
              className="hero-button secondary"
              onClick={handleMoreInfo}
              aria-label="More information"
            >
              <span>ℹ</span> More Info
            </button>
          </div>
        </div>
        
        <div className="hero-poster-container">
          <div className="hero-poster">
            <img 
              src={currentMovie.image} 
              alt={`${currentMovie.title} poster`}
              className="hero-poster-image"
            />
            <div className="hero-poster-rating">
              {currentMovie.rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        className="hero-nav hero-nav-prev" 
        onClick={() => {
          goToPrevious();
          handleNavigationInteraction();
        }}
        aria-label="Previous movie"
      >
        ‹
      </button>
      
      <button 
        className="hero-nav hero-nav-next" 
        onClick={() => {
          goToNext();
          handleNavigationInteraction();
        }}
        aria-label="Next movie"
      >
        ›
      </button>
      
      {topMovies.length > 1 && (
        <div className="hero-indicators">
          {topMovies.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                goToSlide(index);
                handleNavigationInteraction();
              }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;