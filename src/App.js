import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './Components/404/404';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Modal from './Components/Modal/Modal';
import { DataProvider } from './context/DataContext';
import { ModalProvider, useModal } from './context/ModalContext';
import { HomePage, MovieDetailPage, MoviesPage, MyListPage, NewAndPopularPage, TVShowsPage } from './pages';
import AboutPage from './pages/info/AboutPage';

const App = () => {
  return (
    <Router>
      <DataProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </DataProvider>
    </Router>
  );
};

const AppContent = () => {
  const { modalMovie, isModalOpen, closeModal } = useModal();
  
  const getYouTubeVideoId = (url) => {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : '';
  };
  
  const renderMovieContent = () => {
    if (!modalMovie) return null;
    
    return (
      <div className="movie-modal-content">
        {modalMovie.showTrailer && modalMovie.trailerUrl ? (
          <div className="movie-modal-trailer">
            <div className="trailer-container">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(modalMovie.trailerUrl)}?autoplay=1`}
                title={`${modalMovie.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="movie-modal-main">
            <div className="movie-modal-poster">
              <img src={modalMovie.image} alt={modalMovie.title} />
              <div className="movie-modal-rating">
                <i className="star-icon">★</i> {modalMovie.rating.toFixed(1)}
              </div>
            </div>
            
            <div className="movie-modal-info">
              <h1 className="movie-modal-title">
                {modalMovie.title}
                <span className="movie-modal-year"> ({modalMovie.year})</span>
              </h1>
              
              <div className="movie-modal-categories">
                {modalMovie.categories.map((category, index) => (
                  <span key={index} className="movie-category-tag">{category}</span>
                ))}
              </div>
              
              <div className="movie-modal-details">
                <div className="movie-detail">
                  <span className="detail-label">Runtime:</span>
                  <span className="detail-value">
                    {Math.floor(modalMovie.runtime / 60)}h {modalMovie.runtime % 60}m
                  </span>
                </div>
              </div>
              
              <div className="movie-modal-plot">
                <h3>Synopsis</h3>
                <p>{modalMovie.plot}</p>
              </div>
              
              {modalMovie.trailerUrl && (
                <div className="movie-modal-trailer">
                  <h3>Trailer</h3>
                  <div className="trailer-container">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(modalMovie.trailerUrl)}?autoplay=0`}
                      title={`${modalMovie.title} trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="app">
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv-shows" element={<TVShowsPage />} />
          <Route path="/new-and-popular" element={<NewAndPopularPage />} />
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/tv/:id" element={<MovieDetailPage type="tv" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<AboutPage />} />
          <Route path="/privacy" element={<AboutPage />} />
          <Route path="/contact" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={modalMovie ? modalMovie.title : ''}
      >
        {renderMovieContent()}
      </Modal>
      
      <Footer />
    </div>
  );
};

export default App;
