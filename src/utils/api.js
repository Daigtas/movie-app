const API_KEY = 'b7d67803bfe63c328cd9d3489707cc2a';
const BASE_URL = 'https://api.themoviedb.org/3';
export const formatMovieData = (movie) => {
  return {
    id: movie.id,
    title: movie.title || movie.name,
    year: new Date(movie.release_date || movie.first_air_date).getFullYear() || 'Unknown',
    genre_ids: movie.genre_ids || [],
    categories: movie.genres ? movie.genres.map(g => g.name) : [],
    rating: movie.vote_average,
    release_date: movie.release_date || movie.first_air_date,
    image: movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
    plot: movie.overview,
    runtime: movie.runtime || 120,
  };
};
export const formatDetailedMovieData = (movie) => {
  return {
    id: movie.id,
    title: movie.title || movie.name,
    year: new Date(movie.release_date || movie.first_air_date).getFullYear() || 'Unknown',
    categories: movie.genres ? movie.genres.map(genre => genre.name) : [],
    rating: movie.vote_average,
    image: movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
    plot: movie.overview,
    runtime: movie.runtime || 120,
    trailerUrl: movie.videos && movie.videos.results && movie.videos.results.length > 0
      ? `https://www.youtube.com/watch?v=${movie.videos.results[0].key}`
      : null,
  };
};

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await response.json();
    return {
      results: data.results.map(formatMovieData),
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0
    };
  }
};

export const fetchPopularTVShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return [];
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const fetchTrendingTVShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return [];
  }
};

export const fetchTopRatedTVShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching top-rated TV shows:', error);
    return [];
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    );
    const data = await response.json();
    return formatDetailedMovieData(data);
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
};

export const fetchTVShowDetails = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    );
    const data = await response.json();
    return formatDetailedMovieData(data);
  } catch (error) {
    console.error(`Error fetching TV show details for ID ${tvId}:`, error);
    return null;
  }
};

export const fetchMovieGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
};

export const fetchTVGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching TV genres:', error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const searchTVShows = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error('Error searching TV shows:', error);
    return [];
  }
};

export const fetchSimilarMovies = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    return [];
  }
};

export const fetchSimilarTVShows = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results.map(formatMovieData);
  } catch (error) {
    console.error(`Error fetching similar TV shows for ID ${tvId}:`, error);
    return [];
  }
};
