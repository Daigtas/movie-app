import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = ({ movies = [], onMovieClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!movies.length || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, movies.length]);

  if (!movies || movies.length === 0) {
    return (
      <div className="hero hero-empty">
        <div className="hero-empty-content">
          <div className="hero-loading-spinner"></div>
          <p>Loading featured movies...</p>
        </div>
      </div>
    );
  }

  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const handleHeroClick = () => {
    if (onMovieClick) {
      onMovieClick(movies[currentSlide]);
    }
  };

  const currentMovie = movies[currentSlide];
  const formattedRating = typeof currentMovie.rating === 'number'
    ? currentMovie.rating.toFixed(1)
    : '0.0';

  return (
    <div
      className="hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${currentMovie.backdropImage || currentMovie.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-backdrop-overlay" />

      <div className="hero-content">
        <div className="hero-info">
          <h1 className="hero-title">{currentMovie.title || 'Movie Title'}</h1>
          <div className="hero-meta">
            <span className="hero-rating">
              <i className="star-icon">★</i> {formattedRating}
            </span>
            {currentMovie.year && <span className="hero-year">{currentMovie.year}</span>}

            <div className="hero-categories">
              {currentMovie.categories && currentMovie.categories.slice(0, 3).map((category, index) => (
                <span key={index} className="hero-category">{category}</span>
              ))}
            </div>
          </div>
          <p className="hero-description">
            {currentMovie.plot && currentMovie.plot.length > 200
              ? `${currentMovie.plot.substring(0, 200)}...`
              : currentMovie.plot || 'No description available.'}
          </p>

          <div className="hero-actions">
            <button
              className="hero-button primary"
              onClick={handleHeroClick}
              aria-label={`View details for ${currentMovie.title}`}
            >
              More Details
            </button>
          </div>
        </div>

        <div className="hero-poster-container">
          <div className="hero-poster">
            <img
              src={currentMovie.image}
              alt={currentMovie.title}
              className="hero-poster-image"
            />
            <div className="hero-poster-rating">
              {formattedRating}
            </div>
          </div>
        </div>
      </div>

      {movies.length > 1 && (
        <div className="hero-dots">
          {movies.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {movies.length > 1 && (
        <>
          <button
            className="hero-nav hero-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
            }}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button
            className="hero-nav hero-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide((prev) => (prev + 1) % movies.length);
            }}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;