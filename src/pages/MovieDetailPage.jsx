import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieList from '../Components/MovieList';
import { fetchMovieDetails, fetchSimilarMovies, fetchSimilarTVShows, fetchTVShowDetails } from '../utils/api';
import './MovieDetailPage.css';

const MovieDetailPage = ({ type = 'movie' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [similarContent, setSimilarContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [details, similar] = await Promise.all([
          type === 'movie' ? fetchMovieDetails(id) : fetchTVShowDetails(id),
          type === 'movie' ? fetchSimilarMovies(id) : fetchSimilarTVShows(id)
        ]);
        if (!details) {
          throw new Error('Content not found');
        }
        setContent(details);
        setSimilarContent(similar);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${type} details:`, err);
        setError(`Failed to load ${type} details. Please try again later.`);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, type, navigate]);
  
  if (loading) {
    return (
      <div className="content loading-container">
        <div className="loading-spinner"></div>
        <p>Loading {type} details...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="content error-container">
        <p>{error}</p>
      </div>
    );
  }
  const getYouTubeVideoId = (url) => {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : '';
  };
  return (
    <div className="movie-detail-page">
      <div className="movie-detail-hero">
        <div className="movie-backdrop" style={{ backgroundImage: `url(${content.image})` }}></div>
        <div className="movie-detail-content">
          <div className="movie-detail-poster">
            <img src={content.image} alt={`${content.title} poster`} />
            <div className="movie-detail-rating">
              <i className="star-icon">★</i> {content.rating.toFixed(1)}
            </div>
          </div>
          <div className="movie-detail-info">
            <h1>{content.title} <span className="movie-year">({content.year})</span></h1>
            <div className="movie-categories">
              {content.categories.map((category, index) => (
                <span key={index} className="movie-category">{category}</span>
              ))}
            </div>
            <div className="movie-meta">
              <span className="movie-runtime">
                {Math.floor(content.runtime / 60)}h {content.runtime % 60}m
              </span>
            </div>
            <div className="movie-actions">
              <button className="movie-action-button primary">
                <span>▶</span> Watch Now
              </button>
              <button className="movie-action-button">
                <span>+</span> Add to My List
              </button>
            </div>
            <div className="movie-plot">
              <h3>Synopsis</h3>
              <p>{content.plot}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        {content.trailerUrl && (
          <div className="movie-trailer-section">
            <h2>Trailer</h2>
            <div className="movie-trailer">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(content.trailerUrl)}`}
                title={`${content.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        {similarContent.length > 0 && (
          <div className="similar-content-section">
            <h2>Similar {type === 'movie' ? 'Movies' : 'TV Shows'}</h2>
            <MovieList movies={similarContent} type={type} />
          </div>
        )}
      </div>
    </div>
  );
};
export default MovieDetailPage;
