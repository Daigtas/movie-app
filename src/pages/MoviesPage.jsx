import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../Components/Filter';
import MovieGrid from '../Components/MovieGrid';
import Pagination from '../Components/Pagination';
import { fetchPopularMovies } from '../utils/api';
import './pages.css';

const MoviesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get initial values from URL params
  const pageFromUrl = parseInt(queryParams.get('page')) || 1;
  const yearFromUrl = queryParams.get('year') || 'all';
  const genreFromUrl = queryParams.get('genre') || 'all';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    year: yearFromUrl,
    genre: genreFromUrl,
  });
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1);
  const itemsPerPage = 20;

  const fetchMoviesData = useCallback(async (page) => {
    try {
      setLoading(true);
      const data = await fetchPopularMovies(page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update URL when filters or page changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage !== 1) {
      params.set('page', currentPage);
    }
    if (filters.year !== 'all') {
      params.set('year', filters.year);
    }
    if (filters.genre !== 'all') {
      params.set('genre', filters.genre);
    }

    const newUrl = `${location.pathname}${params.toString() ? `?${params}` : ''}`;
    navigate(newUrl, { replace: true });
  }, [currentPage, filters, navigate, location.pathname]);

  // Fetch movies when page or filters change
  useEffect(() => {
    if (!isFiltering && currentPage > 0) {
      fetchMoviesData(currentPage);
    }
  }, [currentPage, isFiltering, fetchMoviesData]);

  const fetchAndFilterMovies = async (filters) => {
    try {
      setLoading(true);
      const allMovies = [];
      let page = 1;
      let hasMore = true;

      // Fetch all pages until no more results or reached max pages
      while (hasMore && page <= 10) {
        const data = await fetchPopularMovies(page);
        if (!data.results?.length) {
          hasMore = false;
        } else {
          const filtered = data.results.filter((movie) => {
            if (filters.year !== 'all') {
              const releaseDate = new Date(movie.release_date);
              if (releaseDate.getFullYear() !== parseInt(filters.year)) {
                return false;
              }
            }
            if (filters.genre !== 'all') {
              return movie.genre_ids && movie.genre_ids.includes(parseInt(filters.genre));
            }
            return true;
          });

          allMovies.push(...filtered);
          if (data.results.length < 20) {
            hasMore = false;
          }
          page++;
        }
      }

      const totalFilteredPages = Math.ceil(allMovies.length / itemsPerPage);
      setFilteredMovies(allMovies);
      setTotalPages(totalFilteredPages);
      setCurrentFilteredPage(1);
      setCurrentPage(1); // Reset regular page number
      setIsFiltering(true);
    } catch (err) {
      setError('Failed to filter movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (newFilters.year !== 'all' || newFilters.genre !== 'all') {
      fetchAndFilterMovies(newFilters);
    } else {
      setIsFiltering(false);
      fetchMoviesData(currentPage);
    }
  };

  const getCurrentPageMovies = () => {
    if (!isFiltering) {
      return movies;
    }

    const startIndex = (currentFilteredPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMovies.slice(startIndex, endIndex);
  };

  // Handle page changes
  const handlePageChange = (page) => {
    if (isFiltering) {
      setCurrentFilteredPage(page);
    } else {
      setCurrentPage(page);
    }

    // Update URL with new page number
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });

    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="content loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content error-container">
        <h2>Error Loading Movies</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="hero-button primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="content">
      <h1>Movies</h1>
      <p className="page-description">
        Browse our complete collection of movies. Use filters to find exactly what you're looking for.
      </p>

      <Filter onFilterChange={handleFilterChange} type="movie" />

      {getCurrentPageMovies().length > 0 ? (
        <>
          <Pagination
            currentPage={isFiltering ? currentFilteredPage : currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <MovieGrid
            movies={getCurrentPageMovies()}
            title={filters.year !== 'all' || filters.genre !== 'all' ? 'Filtered Results' : 'All Movies'}
            type="movie"
          />

          <Pagination
            currentPage={isFiltering ? currentFilteredPage : currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="no-results">
          <h3>No movies found</h3>
          <p>Try adjusting your filters to find more movies.</p>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;