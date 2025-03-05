import { TMDB_API_KEY, TMDB_BASE_URL } from './constants';
import { searchYouTubeTrailers } from './trailers';
import { formatMovie, handleApiError } from './utils';

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos,credits`
    );
    
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    
    const movie = await response.json();
    
    const formattedMovie = formatMovie(movie);
    
    const tmdbTrailer = movie.videos?.results?.find(
      video => video.site === 'YouTube' && 
              (video.type === 'Trailer' || video.type === 'Teaser')
    );
    
    if (tmdbTrailer) {
      formattedMovie.trailerUrl = `https://www.youtube.com/watch?v=${tmdbTrailer.key}`;
      formattedMovie.trailerEmbedUrl = `https://www.youtube.com/embed/${tmdbTrailer.key}`;
      formattedMovie.trailerId = tmdbTrailer.key;
    } else {
      const trailer = await searchYouTubeTrailers(
        formattedMovie.title, 
        formattedMovie.year
      );
      
      if (trailer) {
        formattedMovie.trailerUrl = trailer.url;
        formattedMovie.trailerEmbedUrl = trailer.embedUrl;
        formattedMovie.trailerId = trailer.videoId;
        formattedMovie.trailerThumbnail = trailer.thumbnailUrl;
        formattedMovie.trailerTitle = trailer.title;
      }
    }
    
    return formattedMovie;
  } catch (error) {
    handleApiError(error, `Failed to fetch movie details for ID: ${movieId}`);
  }
};
