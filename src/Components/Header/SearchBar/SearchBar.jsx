import React, { useEffect, useRef, useState } from 'react';
import './Search.css';

console.log(`[${new Date().toISOString()}] [SearchBar.jsx]: Importing React and hooks from 'react'`);
console.log(`[${new Date().toISOString()}] [SearchBar.jsx]: Importing styles from './Search.css'`);

const SearchBar = ({ active, setActive }) => {
  console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [SearchBar]: Component rendering with props:`, { active });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [SearchBar/useEffect]: Search active state changed:`, active);
    if (active && inputRef.current) {
      console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [SearchBar/useEffect]: Focusing search input`);
      inputRef.current.focus();
    }
  }, [active]);
  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [handleSearchChange]: Search query changed:`, query);
    setSearchQuery(query);
    
    if (query.trim() !== '') {
      console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [handleSearchChange]: Performing search`);
      const mockResults = [
        { id: 1, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: 'https://via.placeholder.com/40x60' },
        { id: 2, title: 'The Godfather', year: 1972, rating: 9.2, image: 'https://via.placeholder.com/40x60' },
        { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, image: 'https://via.placeholder.com/40x60' }
      ];
      
      setSearchResults(mockResults.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      ));
      setShowResults(true);
      console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [handleSearchChange]: Found results:`, searchResults.length);
    } else {
      setShowResults(false);
      setSearchResults([]);
      console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [handleSearchChange]: Cleared search results`);
    }
  };
  
  const handleMovieClick = (movie) => {
    console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [handleMovieClick]: Selected movie:`, movie.title);
    setSearchQuery('');
    setShowResults(false);
    setActive(false);
  };
  
  const toggleSearch = () => {
    console.log(`[${new Date().toISOString()}] [SearchBar.jsx] [toggleSearch]: Toggling search:`, !active);
    setActive(!active);
    if (!active) {
      setSearchQuery('');
      setSearchResults([]);
      setShowResults(false);
    }
  };

  return (
    <div className="search-container">
      <button 
        className="search-icon" 
        onClick={toggleSearch}
        aria-label="Toggle search"
      >
        {active ? 'X' : '🔍'}
      </button>
      
      <input
        ref={inputRef}
        type="text"
        className={`search-input ${active ? 'active' : ''}`}
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      
      {active && showResults && (
        <div className={`search-results ${showResults ? 'active' : ''}`}>
          {searchResults.length > 0 ? (
            searchResults.map(movie => (
              <div 
                key={movie.id} 
                className="search-result-item"
                onClick={() => handleMovieClick(movie)}
              >
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="search-result-thumbnail" 
                />
                <div className="search-result-info">
                  <div className="search-result-title">{movie.title}</div>
                  <div className="search-result-meta">
                    <span className="search-result-year">{movie.year}</span>
                    <span className="search-result-rating">★ {movie.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="search-no-results">No movies found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
