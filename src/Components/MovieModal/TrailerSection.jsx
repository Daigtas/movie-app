import React, { useState } from 'react';
import './TrailerSection.css';

const TrailerSection = ({ movie }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!movie || (!movie.trailerEmbedUrl && !movie.trailerId)) {
    return null;
  }

  const trailerUrl = movie.trailerEmbedUrl || `https://www.youtube.com/embed/${movie.trailerId}`;

  const thumbnailUrl = movie.trailerThumbnail || movie.backdropImage || movie.image;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="movie-modal-trailer">
      <h3>Trailer</h3>
      <div className="trailer-container">
        {!isPlaying ? (
          <div className="trailer-thumbnail" onClick={handlePlay}>
            <img
              src={thumbnailUrl}
              alt={`${movie.title} trailer thumbnail`}
              className="trailer-thumbnail-image"
            />
            <div className="trailer-play-overlay">
              <button className="trailer-play-button" aria-label="Play trailer">
                <svg width="68" height="48" viewBox="0 0 68 48">
                  <path
                    className="trailer-play-button-bg"
                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                    fill="#f00"
                  ></path>
                  <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <iframe
            src={`${trailerUrl}?autoplay=1`}
            title={movie.trailerTitle || `${movie.title} trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default TrailerSection;