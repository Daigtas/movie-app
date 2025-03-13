import React, { useEffect, useState } from 'react';
import { fetchPopularTVShows, fetchTopRatedTVShows, fetchTVGenres } from '../../utils/api';
import MovieGrid from '../MovieGrid';
import './TV_Shows.css';

const TVShows = () => {
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [popularData, topRatedData, genresData] = await Promise.all([
          fetchPopularTVShows(),
          fetchTopRatedTVShows(),
          fetchTVGenres()
        ]);
        
        // Apply genres to the TV shows
        const processedPopular = popularData.map(show => ({
          ...show,
          categories: show.genre_ids ? show.genre_ids.map(id => {
            const genre = genresData.find(g => g.id === id);
            return genre ? genre.name : '';
          }).filter(name => name) : []
        }));
        
        const processedTopRated = topRatedData.map(show => ({
          ...show,
          categories: show.genre_ids ? show.genre_ids.map(id => {
            const genre = genresData.find(g => g.id === id);
            return genre ? genre.name : '';
          }).filter(name => name) : []
        }));
        
        setPopularShows(processedPopular);
        setTopRatedShows(processedTopRated);
        setError(null);
      } catch (err) {
        console.error('Error fetching TV shows:', err);
        setError('Failed to load TV shows. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading TV Shows...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="refresh-button">
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="tv-shows-container">
      <section className="tv-shows-section">
        <h2>Popular TV Shows</h2>
        <p className="section-description">
          Check out what everyone's watching right now.
        </p>
        <MovieGrid movies={popularShows} />
      </section>
      
      <section className="tv-shows-section">
        <h2>Top Rated TV Shows</h2>
        <p className="section-description">
          Discover critically acclaimed series that viewers love.
        </p>
        <MovieGrid movies={topRatedShows} />
      </section>
    </div>
  );
};

export default TVShows;