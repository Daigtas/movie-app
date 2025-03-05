

export const getEnvVar = (name, fallback = '') => {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === 'development') {
    console.warn(`Environment variable ${name} is not set, using fallback value.`);
  }
  return value || fallback;
};

export const TMDB_API_KEY = getEnvVar('REACT_APP_TMDB_API_KEY', 'b7d67803bfe63c328cd9d3489707cc2a');
export const YOUTUBE_API_KEY = getEnvVar('REACT_APP_YOUTUBE_API_KEY', 'AIzaSyBl5yksUbqxgGviazpKIOJ3egvvUwYWevY');

export default {
  TMDB_API_KEY,
  YOUTUBE_API_KEY
};
