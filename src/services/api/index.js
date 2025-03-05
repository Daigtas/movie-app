import {
    IMAGE_BASE_URL,
    TMDB_API_KEY,
    TMDB_BASE_URL,
    YOUTUBE_API_KEY,
    YOUTUBE_BASE_URL
} from './constants';

import {
    formatMovie,
    handleApiError,
    mapGenreIdsToNames
} from './utils';

import {
    getConfiguration,
    getGenres
} from './config';

import {
    getMoviesByGenre,
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    searchMovies
} from './movies';

import {
    getMovieDetails
} from './details';

import {
    getMovieTrailer,
    searchYouTubeTrailers
} from './trailers';

const apiService = {
  getConfiguration,
  getGenres,
  getPopularMovies,
  getTopRatedMovies,
  searchMovies,
  getMovieDetails,
  getMoviesByGenre,
  getNowPlayingMovies,
  getUpcomingMovies,
  getMovieTrailer
};

export {
    formatMovie,
    getConfiguration,
    getGenres, getMovieDetails,
    getMoviesByGenre, getMovieTrailer, getNowPlayingMovies, getPopularMovies,
    getTopRatedMovies, getUpcomingMovies,
    handleApiError, IMAGE_BASE_URL, mapGenreIdsToNames, searchMovies, searchYouTubeTrailers,
    TMDB_API_KEY, TMDB_BASE_URL, YOUTUBE_API_KEY, YOUTUBE_BASE_URL
};

export default apiService;
