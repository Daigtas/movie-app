export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'b7d67803bfe63c328cd9d3489707cc2a';
export const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'AIzaSyBl5yksUbqxgGviazpKIOJ3egvvUwYWevY';

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

console.log('API Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  hasApiKey: Boolean(process.env.REACT_APP_TMDB_API_KEY),
  tmdbKeyPrefix: TMDB_API_KEY ? TMDB_API_KEY.substring(0, 4) + '...' : 'missing'
});
