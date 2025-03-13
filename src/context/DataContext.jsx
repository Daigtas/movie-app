import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    fetchMovieGenres,
    fetchNowPlayingMovies,
    fetchPopularMovies,
    fetchPopularTVShows,
    fetchTopRatedMovies,
    fetchTrendingMovies
} from '../utils/api';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch movie genres first
        const genresData = await fetchMovieGenres();
        
        // Fetch all other data in parallel
        const [popularData, topRatedData, trendingData, nowPlayingData, tvShowsData] = 
          await Promise.all([
            fetchPopularMovies(),
            fetchTopRatedMovies(),
            fetchTrendingMovies(),
            fetchNowPlayingMovies(),
            fetchPopularTVShows()
          ]);

        // Process the data before setting state
        setGenres(genresData);
        setPopularMovies(popularData.results || []);  // Handle pagination response
        setTopRatedMovies(topRatedData);
        setTrendingMovies(trendingData);
        setNowPlayingMovies(nowPlayingData);
        setTvShows(tvShowsData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  const value = {
    movies: {
      popular: popularMovies,
      topRated: topRatedMovies,
      trending: trendingMovies,
      nowPlaying: nowPlayingMovies,
    },
    tvShows,
    genres,
    loading,
    error
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
