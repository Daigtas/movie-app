import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

class MovieCardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`[${new Date().toISOString()}] [MovieList.jsx] [MovieCardErrorBoundary]: Error caught:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="movie-card movie-card-error">
          <div className="movie-card-error-content">
            <span>⚠️</span>
            <p>Error loading movie</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const MovieList = ({ movies, title }) => {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const { openModal } = useModal();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [scrollable, setScrollable] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
      checkOverflow();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const checkOverflow = () => {
    if (listRef.current) {
      const isScrollable = listRef.current.scrollWidth > listRef.current.clientWidth;
      setScrollable(isScrollable);
    }
  };
  
  useEffect(() => {
    checkOverflow();
  }, [movies]);
  
  const handleScroll = (direction) => {
    if (isMobile || !listRef.current) return;
    
    const container = listRef.current;
    const cardWidth = 200;
    const scrollAmount = cardWidth * 2;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };
  
  const handleMovieClick = (movie) => {
    openModal(movie);
  };
  
  if (!movies || !movies.length) {
    return null;
  }
  
  return (
    <div className="movie-list-container">
      {title && <h2 className="movie-list-title">{title}</h2>}
      <div className="movie-list-scroll-container" ref={containerRef}>
        {scrollable && !isMobile && (
          <button 
            className="scroll-button scroll-left" 
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}
        
        <div className="movie-list" ref={listRef}>
          {movies.map((movie) => (
            <MovieCardErrorBoundary key={movie.id || Math.random().toString(36).substring(7)}>
              <MovieCard 
                movie={movie} 
                onClick={() => handleMovieClick(movie)}
              />
            </MovieCardErrorBoundary>
          ))}
        </div>
        
        {scrollable && !isMobile && (
          <button 
            className="scroll-button scroll-right" 
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;
