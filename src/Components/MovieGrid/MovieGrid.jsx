import React from 'react';
import MovieCard from '../MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies, title, type = 'movie' }) => {
  return (
    <div className="movie-grid-container">
      {title && <h2 className="movie-grid-title">{title}</h2>}
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <MovieCard 
            key={`${movie.id}-${index}`} 
            movie={movie} 
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
