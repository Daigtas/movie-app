import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { searchMovies } from '../../services/api';
import './SearchBar.css';

const MIN_SEARCH_QUERY_LENGTH = 2;

const SearchBar = ({ onMovieSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery.trim().length >= MIN_SEARCH_QUERY_LENGTH) {
      performSearch();
    }
  }, [debouncedSearchQuery]);

  const performSearch = async () => {
    if (searchQuery.trim().length < MIN_SEARCH_QUERY_LENGTH) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to search for movies. Please try again later.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openSearch = () => {
    setIsOpen(true);
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleMovieClick = (movie) => {
    onMovieSelect(movie);
    closeSearch();
  };

  const renderSearchResults = () => {
    if (error) {
      return (
        <div className="search-message error">
          <p>{error}</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="search-message">
          <div className="search-loading-spinner"></div>
          <p>Searching...</p>
        </div>
      );
    }

    if (searchQuery.trim().length < MIN_SEARCH_QUERY_LENGTH) {
      return (
        <div className="search-message">
          <p>Type at least {MIN_SEARCH_QUERY_LENGTH} characters to search</p>
        </div>
      );
    }

    return (
      <>
        <h2 className="search-results-title">
          {searchResults.length} results for "{searchQuery}"
        </h2>
        <div className="search-results-grid">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="search-result-card"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="search-result-poster">
                <img
                  src={movie.image ? movie.image : '/images/default-movie.jpg'}
                  alt={movie.title}
                />
                {movie.rating && (
                  <div className="search-result-rating">
                    {movie.rating.toFixed(1)}
                  </div>
                )}
              </div>
              <div className="search-result-info">
                <h3>{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const SearchButton = ({ openSearch }) => (
    <button className="search-button" onClick={openSearch} aria-label="Search">
      🔍
    </button>
  );

  const SearchOverlay = ({
    inputRef,
    searchQuery,
    setSearchQuery,
    clearSearch,
    closeSearch,
    renderSearchResults,
  }) => (
    <div className="search-overlay">
      <div className="search-header">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button
              className="search-clear-button"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <button
          className="search-close-button"
          onClick={closeSearch}
          aria-label="Close search"
        >
          ×
        </button>
      </div>
      <div className="search-results-container">
        {renderSearchResults()}
      </div>
    </div>
  );

  return (
    <>
      <SearchButton openSearch={openSearch} />
      {isOpen && (
        <SearchOverlay
          inputRef={inputRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
          closeSearch={closeSearch}
          renderSearchResults={renderSearchResults}
        />
      )}
    </>
  );
};

export default SearchBar;