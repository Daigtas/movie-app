import React from 'react';
import './InfoPages.css';

const AboutPage = () => {
  return (
    <div className="content info-page">
      <h1>About Movie App</h1>
      <div className="info-content">
        <p>Movie App is your ultimate destination for discovering movies and TV shows. Built with the TMDB API, we provide:</p>
        <ul>
          <li>Latest movie and TV show information</li>
          <li>High-quality trailers and previews</li>
          <li>Detailed ratings and reviews</li>
          <li>Personalized recommendations</li>
        </ul>
        <p>Our platform uses data from The Movie Database (TMDB) and aims to provide the best possible experience for movie enthusiasts.</p>
      </div>
    </div>
  );
};

export default AboutPage;
