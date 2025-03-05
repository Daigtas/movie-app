import React, { useState, useRef } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick, onWatchTrailer }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const imageRef = useRef(null);

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const getImageSource = () => {
    if (imageError || !movie.image) {
      return '/images/default-movie.jpg';
    }
    return movie.image;
  };

  const handleTrailerClick = (e) => {
    e.stopPropagation();
    if (onWatchTrailer) {
      onWatchTrailer(movie);
    }
  };

  const formattedRating = typeof movie.rating === 'number'
    ? movie.rating.toFixed(1)
    : '0.0';

  return (
    <div
      className="movie-card"
      onClick={() => onClick && onClick(movie)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movie-poster">
        {isImageLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
        <img
          src={getImageSource()}
          alt={`${movie.title} poster`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
          ref={imageRef}
        />
        <div className="movie-rating" hidden={isImageLoading}>
          <span>{formattedRating}</span>
        </div>

        {isHovered && (
          <div className="movie-card-overlay">
            <button
              className="movie-card-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick(movie);
              }}
              aria-label={`View details for ${movie.title}`}
            >
              Details
            </button>

            {movie.trailerUrl && (
              <button
                className="movie-card-trailer-btn"
                onClick={handleTrailerClick}
                aria-label={`Watch trailer for ${movie.title}`}
              >
                <span className="play-icon">▶</span> Watch Trailer
              </button>
            )}
          </div>
        )}
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
        <div className="movie-year">{movie.year || 'Unknown'}</div>
      </div>
    </div>
  );
};

export default MovieCard;