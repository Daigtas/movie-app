import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConsistentPlaceholder } from '../../assets/placeholders';
import './MovieCard.css';

const MovieCard = ({ movie, onClick, type = 'movie' }) => {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const getImageSource = () => {
    if (imageError) {
      return getConsistentPlaceholder(movie.id || movie.title);
    }
    return movie.image;
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    } else {
      navigate(`/${type}/${movie.id || movie.title}`);
    }
  };
  
  return (
    <div className="movie-card" onClick={handleClick} ref={cardRef}>
      <div className="movie-poster">
        <img 
          src={getImageSource()} 
          alt={`${movie.title} poster`} 
          onError={handleImageError}
          loading="lazy"
        />
        <div className="movie-rating">
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
        <div className="movie-year">{movie.year}</div>
      </div>
    </div>
  );
};

export default MovieCard;
