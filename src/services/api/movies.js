import { getGenres } from './config';
import { TMDB_API_KEY, TMDB_BASE_URL } from './constants';
import { formatMovie, handleApiError, mapGenreIdsToNames } from './utils';

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
    );
    
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    
    const data = await response.json();
    
    const genres = await getGenres();
    
    return data.results.map(movie => ({
      ...formatMovie(movie),
      categories: mapGenreIdsToNames(movie.genre_ids, genres)
    }));
  } catch (error) {
    console.error('Failed to fetch popular movies, using mock data:', error);
    return null;
  }
};

export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
    );
    
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    
    const data = await response.json();
    
    const genres = await getGenres();
    
    return data.results.map(movie => ({
      ...formatMovie(movie),
      categories: mapGenreIdsToNames(movie.genre_ids, genres)
    }));
  } catch (error) {
    handleApiError(error, 'Failed to fetch top-rated movies');
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    if (!query || query.trim() === '') return [];
    
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
    );
    
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    
    const data = await response.json();
    
    const genres = await getGenres();
    
    return data.results.map(movie => ({
      ...formatMovie(movie),
      categories: mapGenreIdsToNames(movie.genre_ids, genres)
    }));
  } catch (error) {
    handleApiError(error, 'Failed to search movies');
    return [];
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
    );
    
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    
    const data = await response.json();
    
    const genres = await getGenres();
    
    return data.results.map(movie => ({
      ...formatMovie(movie),
      categories: mapGenreIdsToNames(movie.genre_ids, genres)
    }));
  } catch (error) {
    handleApiError(error, `Failed to fetch movies for genre: ${genreId}`);
    return [];
  }
};

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
    );
    
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    
    const data = await response.json();
    
    const genres = await getGenres();
    
    return data.results.map(movie => ({
      ...formatMovie(movie),
      categories: mapGenreIdsToNames(movie.genre_ids, genres)
    }));
  } catch (error) {
    handleApiError(error, 'Failed to fetch now playing movies');
    return [];
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
    );
    
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    
    const data = await response.json();
    
    const genres = await getGenres();
    
    return data.results.map(movie => ({
      ...formatMovie(movie),
      categories: mapGenreIdsToNames(movie.genre_ids, genres)
    }));
  } catch (error) {
    handleApiError(error, 'Failed to fetch upcoming movies');
    return [];
  }
};
