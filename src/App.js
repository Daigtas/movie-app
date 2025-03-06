import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Hero from './Components/Header/Hero/Hero';
import Modal from './Components/Modal/Modal';
import TrailerModal from './Components/Modal/TrailerModal';
import MovieSection from './Components/MovieSection';
import { LanguageProvider, useLanguage } from './Components/context/LanguageContext';
import { ModalProvider, useModal } from './Components/context/ModalContext';
import { SearchProvider } from './Components/context/SearchContext';
import {
  getMovieDetails,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from './services/api';
import EnvChecker from './utils/EnvChecker';

const AppContent = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { modalMovie, isModalOpen, closeModal, openModal } = useModal();
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        
        const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
          getNowPlayingMovies()
        ]);
        
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setUpcomingMovies(upcoming);
        setNowPlayingMovies(nowPlaying);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const handleMovieClick = useCallback(async (movie) => {
    try {
      const fullDetails = await getMovieDetails(movie.id);
      openModal(fullDetails);
    } catch (err) {
      console.error('Error fetching movie details:', err);
      openModal(movie);
    }
  }, [openModal]);
  
  const openTrailerModal = (movie) => {
    if (movie && (movie.trailerUrl || movie.trailerEmbedUrl)) {
      setSelectedTrailer(movie);
      setTrailerModalOpen(true);
    } else {
      console.warn('No trailer available for this movie');
    }
  };

  const translateCategory = (category) => {
    const key = category.toLowerCase().replace(/\s+/g, '');
    
    return t(key) === key ? category : t(key);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="app">
      <Header />
      
      {!loading && topRatedMovies.length > 0 ? (
        <Hero movies={topRatedMovies.slice(0, 5)} onMovieClick={handleMovieClick} />
      ) : (
        <div className="hero hero-empty">
          <div className="loading-spinner"></div>
          <p>{t('loadingFeatured')}</p>
        </div>
      )}
      
      <div className="content">
        <MovieSection 
          title={t('popular')}
          movies={popularMovies} 
          isLoading={loading} 
          onMovieClick={handleMovieClick}
          onWatchTrailer={openTrailerModal}
        />
        
        <MovieSection 
          title={t('topRated')}
          movies={topRatedMovies} 
          isLoading={loading} 
          onMovieClick={handleMovieClick}
          onWatchTrailer={openTrailerModal}
        />
        
        <MovieSection 
          title={t('nowPlaying')}
          movies={nowPlayingMovies} 
          isLoading={loading} 
          onMovieClick={handleMovieClick}
          onWatchTrailer={openTrailerModal}
        />
        
        <MovieSection 
          title={t('upcoming')}
          movies={upcomingMovies} 
          isLoading={loading} 
          onMovieClick={handleMovieClick}
          onWatchTrailer={openTrailerModal}
        />
      </div>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={modalMovie?.title || ''}
      >
        {modalMovie && (
          <div className="movie-modal-content">
            <div className="movie-modal-main">
              <div className="movie-modal-poster">
                <img src={modalMovie.image} alt={modalMovie.title} />
                <div className="movie-modal-rating">
                  <span>★</span> {typeof modalMovie.rating === 'number' ? modalMovie.rating.toFixed(1) : '0.0'}
                </div>
              </div>
              
              <div className="movie-modal-info">
                <h1 className="movie-modal-title">
                  {modalMovie.title}
                  {modalMovie.year && <span className="movie-modal-year"> ({modalMovie.year})</span>}
                </h1>
                
                <div className="movie-modal-categories">
                  {modalMovie.categories && modalMovie.categories.map((category, index) => (
                    <span key={index} className="movie-category-tag">
                      {translateCategory(category)}
                    </span>
                  ))}
                </div>
                
                <div className="movie-modal-plot">
                  <h3>{t('synopsis')}</h3>
                  <p>{modalMovie.plot || 'No description available.'}</p>
                </div>
                
                {modalMovie.trailerUrl && (
                  <button 
                    className="watch-trailer-btn"
                    onClick={() => openTrailerModal(modalMovie)}
                  >
                    <span className="play-icon">▶</span> {t('trailer')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      <TrailerModal 
        isOpen={trailerModalOpen}
        onClose={() => setTrailerModalOpen(false)}
        movie={selectedTrailer}
      />
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ModalProvider>
      <LanguageProvider>
        <SearchProvider>
          {process.env.NODE_ENV === 'development' && <EnvChecker />}
          <AppContent />
        </SearchProvider>
      </LanguageProvider>
    </ModalProvider>
  );
}

export default App;
