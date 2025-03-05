import { YOUTUBE_API_KEY, YOUTUBE_BASE_URL } from './constants';

export const searchYouTubeTrailers = async (movieTitle, releaseYear) => {
  try {
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API key is missing');
      return null;
    }

    const searchQuery = `${movieTitle} ${releaseYear || ''} official trailer`;
    
    const response = await fetch(
      `${YOUTUBE_BASE_URL}/search?key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(searchQuery)}&part=snippet&maxResults=1&type=video`
    );

    if (!response.ok) {
      throw new Error(`YouTube API returned status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      return {
        videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: data.items[0].snippet.thumbnails.high?.url || data.items[0].snippet.thumbnails.default?.url,
        title: data.items[0].snippet.title
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return null;
  }
};

export const getMovieTrailer = async (movieTitle, releaseYear) => {
  return await searchYouTubeTrailers(movieTitle, releaseYear);
};
