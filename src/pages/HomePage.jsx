import React, { useState } from 'react';
import Filter from '../Components/Filter';
import Hero from '../Components/Header/Hero/Hero';
import MovieList from '../Components/MovieList';
import { useData } from '../context/DataContext';
import './pages.css';

const HomePage = () => {
  const { movies, loading, error } = useData();
  const [filters, setFilters] = useState({ year: 'all', genre: 'all' });
  
  if (loading) {
    return (
      <div className="content loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="content error-container">
        <h2>Error Loading Movies</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="hero-button primary">
          Try Again
        </button>
      </div>
    );
  }

  // Safely access nested properties
  const topMovies = movies?.topRated?.slice(0, 10) || [];
  const popularMovies = movies?.popular || [];
  const trendingMovies = movies?.trending?.slice(0, 10) || [];
  const nowPlayingMovies = movies?.nowPlaying?.slice(0, 10) || [];
  
  const getFilteredMovies = () => {
    if (filters.year === 'all' && filters.genre === 'all') {
      return popularMovies;
    }
    
    return popularMovies.filter(movie => {
      if (filters.year !== 'all' && movie.year !== parseInt(filters.year)) {
        return false;
      }
      if (filters.genre !== 'all' && 
          !movie.categories.some(category => category.toLowerCase() === filters.genre.toLowerCase())) {
        return false;
      }
      return true;
    });
  };
  
  const filteredMovies = getFilteredMovies();
  
  const getCategoryMovies = () => {
    if (filters.year !== 'all' || filters.genre !== 'all') {
      return {};
    }
    
    const categoryMovies = {};
    
    popularMovies.forEach(movie => {
      if (movie.categories) {  // Add null check
        movie.categories.forEach(category => {
          if (!categoryMovies[category]) {
            categoryMovies[category] = [];
          }
          if (categoryMovies[category].length < 15) {
            categoryMovies[category].push(movie);
          }
        });
      }
    });
    
    return categoryMovies;
  };
  
  const categoryMovies = getCategoryMovies();
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      {topMovies.length > 0 && <Hero movies={topMovies} />}
      
      <div className="content">
        <h2>{filters.year !== 'all' || filters.genre !== 'all' ? 'Filtered Movies' : 'Popular Movies'}</h2>
        
        <Filter onFilterChange={handleFilterChange} />
        
        <MovieList 
          movies={filteredMovies} 
          title={filters.year !== 'all' || filters.genre !== 'all' ? 'Filtered Results' : 'Popular Movies'} 
        />
        
        {filters.year === 'all' && filters.genre === 'all' && (
          <>
            <h2>Trending Now</h2>
            <MovieList movies={trendingMovies} />
            
            <h2>Now Playing in Theaters</h2>
            <MovieList movies={nowPlayingMovies} />
            
            {Object.keys(categoryMovies).slice(0, 3).map(category => (
              <div key={category}>
                <h2>{category} Movies</h2>
                <MovieList movies={categoryMovies[category].slice(0, 8)} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
