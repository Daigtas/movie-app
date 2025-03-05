import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span>🎬 Movie App</span>
          </div>
          <p className="footer-description">
            Browse and discover movies from the TMDB database
          </p>
          
          <div className="footer-columns">
            <div className="footer-column">
              <h3>Navigation</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#movies">Movies</a></li>
                <li><a href="#top-rated">Top Rated</a></li>
                <li><a href="#upcoming">Upcoming</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Categories</h3>
              <ul>
                <li><a href="#action">Action</a></li>
                <li><a href="#comedy">Comedy</a></li>
                <li><a href="#drama">Drama</a></li>
                <li><a href="#sci-fi">Science Fiction</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {currentYear} Movie App. All rights reserved.
            </p>
            <p className="footer-disclaimer">
              This product uses the TMDB API but is not endorsed or certified by TMDB. 
              All movie data and images are provided by 
              <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer"> The Movie Database</a>.
            </p>
            <div className="tmdb-logo">
              <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;