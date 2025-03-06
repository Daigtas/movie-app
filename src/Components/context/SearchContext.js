import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { searchMovies } from '../../services/api';

const MIN_SEARCH_QUERY_LENGTH = 2;
const MAX_RECENT_SEARCHES = 5;
const RECENT_SEARCHES_KEY = 'recentSearches';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
export const SearchProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (err) {
        console.error('Failed to parse recent searches', err);
        setRecentSearches([]);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
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
  const addToRecentSearches = useCallback((query) => {
    if (query.trim().length < MIN_SEARCH_QUERY_LENGTH) return;
    setRecentSearches(prevSearches => {
      const filteredSearches = prevSearches.filter(s => s !== query);
      const newSearches = [query, ...filteredSearches];
      return newSearches.slice(0, MAX_RECENT_SEARCHES);
    });
  }, []);

  const deleteRecentSearch = useCallback((query) => {
    setRecentSearches(prevSearches => 
      prevSearches.filter(search => search !== query)
    );
  }, []);
  const clearAllRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);
  const performSearch = useCallback(async () => {
    if (searchQuery.trim().length < MIN_SEARCH_QUERY_LENGTH) return;
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      if (results.length > 0) {
        addToRecentSearches(searchQuery);
      }
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to search for movies. Please try again later.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, addToRecentSearches]);

  useEffect(() => {
    if (debouncedSearchQuery.trim().length >= MIN_SEARCH_QUERY_LENGTH) {
      performSearch();
    }
  }, [debouncedSearchQuery, performSearch]);
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

  const selectRecentSearch = (query) => {
    setSearchQuery(query);
  };

  const value = {
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
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
