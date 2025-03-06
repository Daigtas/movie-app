import { useEffect, useState } from 'react';
import LanguageSelect from '../LanguageSelect';
import SearchBar from '../SearchBar/SearchBar';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
   
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleMovieSelect = (movie) => {
    console.log('Selected movie:', movie);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo">
          <a href="/">
            <span className="logo-text">MovieApp</span>
          </a>
        </div>
        
        <nav className={`navigation ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><a href="/">{t('home')}</a></li>
            <li className="nav-item"><a href="/movies">{t('movies')}</a></li>
            <li className="nav-item"><a href="/tv-shows">{t('tvShows')}</a></li>
            <li className="nav-item"><a href="/favorites">{t('favorites')}</a></li>
          </ul>
          <div className="mobile-menu-bottom">
            <SearchBar onMovieSelect={handleMovieSelect} />
            <LanguageSelect />
          </div>
        </nav>
        
        <div className="header-actions">
          <SearchBar onMovieSelect={handleMovieSelect} />
          <LanguageSelect />
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
