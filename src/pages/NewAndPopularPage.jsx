import React, { useEffect, useState } from 'react';
import MovieList from '../Components/MovieList';
import { fetchNowPlayingMovies, fetchPopularMovies, fetchUpcomingMovies } from '../utils/api';
import './pages.css';

const NewAndPopularPage = () => {
  const [content, setContent] = useState({
    upcoming: [],
    popular: [],
    nowPlaying: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [upcomingData, popularData, nowPlayingData] = await Promise.all([
          fetchUpcomingMovies(),
          fetchPopularMovies(),
          fetchNowPlayingMovies()
        ]);

        setContent({
          upcoming: upcomingData,
          popular: popularData,
          nowPlaying: nowPlayingData
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching new and popular content:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="content loading-container">
        <div className="loading-spinner"></div>
        <p>Loading new releases and popular content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content error-container">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="hero-button primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="content">
      <h1>New & Popular</h1>
      <p className="page-description">
        Discover the latest releases and trending content that everyone's talking about.
      </p>

      <section>
        <h2>Coming Soon</h2>
        <MovieList movies={content.upcoming} />
      </section>

      <section>
        <h2>Now Playing</h2>
        <MovieList movies={content.nowPlaying} />
      </section>

      <section>
        <h2>What's Popular</h2>
        <MovieList movies={content.popular} />
      </section>
    </div>
  );
};

export default NewAndPopularPage;
