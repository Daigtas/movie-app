import { TMDB_API_KEY, TMDB_BASE_URL } from './constants';
import { handleApiError } from './utils';

export const getConfiguration = async () => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    handleApiError(error, 'Failed to fetch configuration');
  }
};

export const getGenres = async () => {
  try {
    console.debug('Fetching genres with API key', TMDB_API_KEY.substring(0, 4) + '...');
    const url = `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`;
    console.debug('Genre API URL:', url.replace(TMDB_API_KEY, '[REDACTED]'));
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Genre fetch failed with status: ${response.status}`);
      throw new Error(`Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Failed to fetch genres, using mock data instead:', error);
    return [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' }
    ];
  }
};
