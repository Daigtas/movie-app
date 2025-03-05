import React, { useRef } from 'react';
import MovieCard from '../MovieCard';
import './MovieSection.css';

const MovieSection = ({ title, movies = [], isLoading, onMovieClick, onWatchTrailer }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="movie-section">
        <h2>{title}</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading movies...</p>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-section">
        <h2>{title}</h2>
        <div className="empty-container">
          <p>No movies available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-section">
      <div className="movie-section-header">
        <h2>{title}</h2>
      </div>

      <div className="movie-section-carousel">
        <button
          className="scroll-button scroll-left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          &lt;
        </button>

        <div className="movie-section-container" ref={scrollContainerRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
              onWatchTrailer={onWatchTrailer}
            />
          ))}
        </div>

        <button
          className="scroll-button scroll-right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieSection;