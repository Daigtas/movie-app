import { IMAGE_BASE_URL, TMDB_API_KEY } from './constants';

export const handleApiError = (error, message = 'An error occurred') => {
  console.error(`API Error: ${message}`, error);
  if (message.includes('fetch')) {
    console.debug(`API Key check: ${TMDB_API_KEY.substring(0, 4)}...`);
  }
  throw new Error(`${message}: ${error.message}`);
};

export const formatMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
    image: movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : '/images/default-movie.jpg',
    backdropImage: movie.backdrop_path ? `${IMAGE_BASE_URL}/original${movie.backdrop_path}` : null,
    rating: movie.vote_average || 0,
    categories: movie.genres ? movie.genres.map(g => g.name) : 
               movie.genre_ids ? movie.genre_ids.map(id => `Genre ${id}`) : [],
    plot: movie.overview || 'No description available',
    runtime: movie.runtime || 120,
    trailerUrl: null,
    originalLanguage: movie.original_language,
    popularity: movie.popularity,
    voteCount: movie.vote_count,
    productionCompanies: movie.production_companies,
    releaseDate: movie.release_date
  };
};

export const mapGenreIdsToNames = (genreIds = [], genresList = []) => {
  if (!genreIds || !genresList) return [];
  
  return genreIds.map(id => {
    const genre = genresList.find(g => g.id === id);
    return genre ? genre.name : `Genre ${id}`;
  });
};
