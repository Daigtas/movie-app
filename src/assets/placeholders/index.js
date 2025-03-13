const placeholderImages = [
  '/images/placeholders/movie-placeholder-1.jpg',
  '/images/placeholders/movie-placeholder-2.jpg',
  '/images/placeholders/movie-placeholder-3.jpg',
  '/images/placeholders/movie-placeholder-4.jpg',
  '/images/placeholders/movie-placeholder-5.jpg'
];

const FALLBACK_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='375' viewBox='0 0 250 375' fill='none'%3E%3Crect width='250' height='375' fill='%23333333'/%3E%3Cpath d='M125 187.5C138.807 187.5 150 176.307 150 162.5C150 148.693 138.807 137.5 125 137.5C111.193 137.5 100 148.693 100 162.5C100 176.307 111.193 187.5 125 187.5Z' fill='%23555555'/%3E%3Cpath d='M84.375 237.5C84.375 214.1 102.475 195 125 195C147.525 195 165.625 214.1 165.625 237.5' stroke='%23555555' stroke-width='12'/%3E%3Ctext x='125' y='300' font-family='Arial' font-size='18' fill='%23999999' text-anchor='middle'%3EImage not available%3C/text%3E%3C/svg%3E";

export const getRandomPlaceholder = () => {
  try {
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    return placeholderImages[randomIndex];
  } catch (error) {
    return FALLBACK_PLACEHOLDER;
  }
};

export const getConsistentPlaceholder = (identifier) => {
  try {
    if (!identifier) return placeholderImages[0] || FALLBACK_PLACEHOLDER;
    
    const hash = String(identifier)
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const index = hash % placeholderImages.length;
    return placeholderImages[index] || FALLBACK_PLACEHOLDER;
  } catch (error) {
    return FALLBACK_PLACEHOLDER;
  }
};

export default placeholderImages;
