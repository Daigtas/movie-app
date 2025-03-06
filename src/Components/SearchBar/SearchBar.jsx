import { useLanguage } from '../context/LanguageContext';
import { useSearch } from '../context/SearchContext';
import './SearchBar.css';

const SearchBar = ({ onMovieSelect }) => {
  const {
    isOpen,
    searchQuery,
    searchResults,
    isLoading,
    error,
    inputRef,
    MIN_SEARCH_QUERY_LENGTH,
    recentSearches,
    setSearchQuery,
    openSearch,
    closeSearch,
    clearSearch,
    selectRecentSearch,
    deleteRecentSearch,
    clearAllRecentSearches
  } = useSearch();
  
  const { t } = useLanguage();

  const handleMovieClick = (movie) => {
    onMovieSelect(movie);
    closeSearch();
  };

  const renderRecentSearches = () => {
    if (recentSearches.length === 0) return null;

    return (
      <div className="recent-searches">
        <div className="recent-searches-header">
          <h3>{t('recentSearches')}</h3>
          <button 
            className="clear-all-searches-btn" 
            onClick={clearAllRecentSearches}
            aria-label={t('clearAll')}
          >
            {t('clearAll')}
          </button>
        </div>
        <ul className="recent-searches-list">
          {recentSearches.map((query, index) => (
            <li key={index} className="recent-search-item">
              <button 
                className="recent-search-query" 
                onClick={() => selectRecentSearch(query)}
              >
                {query}
              </button>
              <button 
                className="delete-search-btn" 
                onClick={() => deleteRecentSearch(query)}
                aria-label={`Delete ${query} from recent searches`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
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
          <p>{t('searching')}</p>
        </div>
      );
    }

    if (searchQuery.trim().length < MIN_SEARCH_QUERY_LENGTH) {
      return (
        <>
          <div className="search-message">
            <p>{t('searchMinChars', MIN_SEARCH_QUERY_LENGTH)}</p>
          </div>
          {renderRecentSearches()}
        </>
      );
    }

    return (
      <>
        <h2 className="search-results-title">
          {t('searchResults', searchResults.length, searchQuery)}
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

  const SearchButton = () => (
    <button className="search-button" onClick={openSearch} aria-label={t('search')}>
      🔍
    </button>
  );

  const SearchOverlay = () => (
    <div className="search-overlay">
      <div className="search-header">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button
              className="search-clear-button"
              onClick={clearSearch}
              aria-label={t('clearSearch')}
            >
              ×
            </button>
          )}
        </div>
        <button
          className="search-close-button"
          onClick={closeSearch}
          aria-label={t('close')}
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
      <SearchButton />
      {isOpen && <SearchOverlay />}
    </>
  );
};

export default SearchBar;