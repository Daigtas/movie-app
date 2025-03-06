import { createContext, useContext, useEffect, useState } from 'react';

const translations = {
  en: {
    home: 'Home',
    movies: 'Movies',
    tvShows: 'TV Shows',
    favorites: 'Favorites',
    next: 'Next',
    prev: 'Previous',
    search: 'Search',
    clearSearch: 'Clear search',
    close: 'Close',
    searchPlaceholder: 'Search for movies...',
    searching: 'Searching...',
    searchMinChars: 'Type at least {0} characters to search',
    searchResults: '{0} results for "{1}"',
    recentSearches: 'Recent Searches',
    clearAll: 'Clear All',
    rating: 'Rating',
    duration: 'Duration',
    releaseDate: 'Release Date',
    director: 'Director',
    cast: 'Cast',
    overview: 'Overview',
    synopsis: 'Synopsis',
    trailer: 'Watch Trailer',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    details: 'Details',
    moreDetails: 'More Details',
    trending: 'Trending Now',
    popular: 'Popular Movies',
    topRated: 'Top Rated Movies',
    upcoming: 'Upcoming Movies',
    nowPlaying: 'Now Playing',
    action: 'Action',
    adventure: 'Adventure',
    animation: 'Animation',
    comedy: 'Comedy',
    crime: 'Crime',
    documentary: 'Documentary',
    drama: 'Drama',
    family: 'Family',
    fantasy: 'Fantasy',
    history: 'History',
    horror: 'Horror',
    music: 'Music',
    mystery: 'Mystery',
    romance: 'Romance',
    sciFi: 'Science Fiction',
    thriller: 'Thriller',
    war: 'War',
    western: 'Western',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    navigation: 'Navigation',
    categories: 'Categories',
    legal: 'Legal',
    action: 'Action',
    comedy: 'Comedy',
    drama: 'Drama',
    sciFi: 'Science Fiction',
    footerDescription: 'Browse and discover movies from the TMDB database',
    allRightsReserved: 'All rights reserved.',
    tmdbDisclaimer: 'This product uses the TMDB API but is not endorsed or certified by TMDB. All movie data and images are provided by',
    minutes: 'min',
    loadMore: 'Load More',
    backToTop: 'Back to Top',
    language: 'Language',
    loading: 'Loading...',
    loadingFeatured: 'Loading featured movies...'
  },
  lt: {
    home: 'Pagrindinis',
    movies: 'Filmai',
    tvShows: 'TV Laidos',
    favorites: 'Mėgstamiausi',
    next: 'Kitas',
    prev: 'Ankstesnis',
    search: 'Ieškoti',
    clearSearch: 'Išvalyti paiešką',
    close: 'Uždaryti',
    searchPlaceholder: 'Ieškoti filmų...',
    searching: 'Ieškoma...',
    searchMinChars: 'Įveskite bent {0} simbolius paieškai',
    searchResults: '{0} rezultatai pagal "{1}"',
    recentSearches: 'Pastarieji ieškojimai',
    clearAll: 'Išvalyti visus',
    rating: 'Įvertinimas',
    duration: 'Trukmė',
    releaseDate: 'Išleidimo data',
    director: 'Režisierius',
    cast: 'Aktoriai',
    overview: 'Aprašymas',
    synopsis: 'Santrauka',
    trailer: 'Žiūrėti anonsą',
    addToFavorites: 'Pridėti į mėgstamiausius',
    removeFromFavorites: 'Pašalinti iš mėgstamiausių',
    details: 'Detalės',
    moreDetails: 'Daugiau detalių',
    trending: 'Populiaru dabar',
    popular: 'Populiarūs filmai',
    topRated: 'Geriausiai įvertinti filmai',
    upcoming: 'Būsimi filmai',
    nowPlaying: 'Rodomi dabar',
    action: 'Veiksmo',
    adventure: 'Nuotykių',
    animation: 'Animacija',
    comedy: 'Komedija',
    crime: 'Kriminalinis',
    documentary: 'Dokumentinis',
    drama: 'Drama',
    family: 'Šeimos',
    fantasy: 'Fantastika',
    history: 'Istorinis',
    horror: 'Siaubo',
    music: 'Muzikinis',
    mystery: 'Mistinis',
    romance: 'Romantinis',
    sciFi: 'Mokslinė fantastika',
    thriller: 'Trileris',
    war: 'Karinis',
    western: 'Vesternas',
    aboutUs: 'Apie mus',
    contactUs: 'Susisiekti',
    termsOfService: 'Naudojimosi sąlygos',
    privacyPolicy: 'Privatumo politika',
    navigation: 'Navigacija',
    categories: 'Kategorijos',
    legal: 'Teisinė informacija',
    action: 'Veiksmo',
    comedy: 'Komedija',
    drama: 'Drama',
    sciFi: 'Mokslinė fantastika',
    footerDescription: 'Naršykite ir atraskite filmus iš TMDB duomenų bazės',
    allRightsReserved: 'Visos teisės saugomos.',
    tmdbDisclaimer: 'Šis produktas naudoja TMDB API, bet nėra TMDB patvirtintas. Visi filmų duomenys ir nuotraukos teikiami',
    minutes: 'min',
    loadMore: 'Rodyti daugiau',
    backToTop: 'Į viršų',
    language: 'Kalba',
    loading: 'Kraunama...',
    loadingFeatured: 'Kraunami populiarūs filmai...'
  }
};

const LanguageContext = createContext();
const LANGUAGE_STORAGE_KEY = 'preferredLanguage';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage || 'en';
  });
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);
  const changeLanguage = (newLanguage) => {
    if (['en', 'lt'].includes(newLanguage)) {
      setLanguage(newLanguage);
    }
  };
  const t = (key, ...args) => {
    const template = translations[language][key] || key;
    if (!args || args.length === 0) return template;
    return template.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
