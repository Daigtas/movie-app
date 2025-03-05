import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './TrailerModal.css';

const getTrailerRoot = () => {
  let trailerRoot = document.getElementById('trailer-root');
  if (!trailerRoot) {
    trailerRoot = document.createElement('div');
    trailerRoot.id = 'trailer-root';
    document.body.appendChild(trailerRoot);
  }
  return trailerRoot;
};

const TrailerModal = ({ isOpen, onClose, movie }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) {
    return null;
  }

  const trailerUrl = movie.trailerEmbedUrl || (movie.trailerId ? `https://www.youtube.com/embed/${movie.trailerId}` : null);

  if (!trailerUrl) {
    return null;
  }

  const enhancedTrailerUrl = `${trailerUrl}?autoplay=1&rel=0`;

  return ReactDOM.createPortal(
    <div className="trailer-modal-overlay" onClick={onClose}>
      <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="trailer-modal-close"
          onClick={onClose}
          aria-label="Close trailer"
        >
          ×
        </button>
        <h2 className="trailer-modal-title">{movie.title} - Trailer</h2>
        <div className="trailer-modal-iframe-container">
          <iframe
            src={enhancedTrailerUrl}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>,
    getTrailerRoot()
  );
};

export default TrailerModal;