import { useEffect } from 'react';
const EnvChecker = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    
    console.group('Environment Variables Check');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('TMDB API Key exists:', Boolean(process.env.REACT_APP_TMDB_API_KEY));
    console.log('YouTube API Key exists:', Boolean(process.env.REACT_APP_YOUTUBE_API_KEY));
    
    if (process.env.REACT_APP_TMDB_API_KEY) {
      console.log('TMDB API Key prefix:', process.env.REACT_APP_TMDB_API_KEY.substring(0, 4) + '...');
    } else {
      console.warn('TMDB API Key is missing!');
    }
    
    const envVars = Object.keys(process.env).filter(key => key.startsWith('REACT_APP_'));
    console.log('Available React env vars:', envVars);
    console.groupEnd();
  }, []);

  return null;
};

export default EnvChecker;
