import React, { useEffect, useState } from 'react';
import { searchMovies } from '../../services/api';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [searchQuery]);
  
  const performSearch = async (query) => {
    if (query.trim() === '') return;
    
    setIsSearching(true);
    try {
      const results = await searchMovies(query);
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSearchFocus = () => {
    if (searchQuery.trim().length >= 2) {
      setShowResults(true);
    }
  };
  
  const handleClickOutside = (e) => {
    if (!e.target.closest('.search-container')) {
      setShowResults(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <a href="/">🎬 Movie App</a>
        </div>
        
        <div className="search-container">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              className="search-input"
            />
            {isSearching ? (
              <div className="search-icon loading">⟳</div>
            ) : (
              <div className="search-icon">🔍</div>
            )}
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((movie) => (
                <a 
                  key={movie.id}
                  href={`#movie-${movie.id}`}
                  className="search-result-item"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowResults(false);
                  }}
                >
                  <div className="search-result-poster">
                    <img 
                      src={movie.image} 
                      alt={movie.title} 
                      onError={(e) => {
                        e.target.src = '/images/default-movie.jpg';
                      }}
                    />
                  </div>
                  <div className="search-result-info">
                    <div className="search-result-title">{movie.title}</div>
                    <div className="search-result-year">{movie.year}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        
        <nav className="nav">
          <ul>
            <li><a href="#popular">Popular</a></li>
            <li><a href="#top-rated">Top Rated</a></li>
            <li><a href="#upcoming">Upcoming</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className={`hamburger-icon ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
      
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          <li className="mobile-nav-item">
            <a href="#home" className="mobile-nav-link" onClick={closeMobileMenu}>Home</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#movies" className="mobile-nav-link" onClick={closeMobileMenu}>Movies</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#tv-shows" className="mobile-nav-link" onClick={closeMobileMenu}>TV Shows</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#new" className="mobile-nav-link" onClick={closeMobileMenu}>New & Popular</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#my-list" className="mobile-nav-link" onClick={closeMobileMenu}>My List</a>
          </li>
        </ul>
        
    
      </div>
      
      <div 
        className={`backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </header>
  );
};

export default Header;
