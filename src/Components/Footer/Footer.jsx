import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span>🎬 Movie App</span>
          </div>
          <p className="footer-description">
            {t('footerDescription')}
          </p>
          
          <div className="footer-columns">
            <div className="footer-column">
              <h3>{t('navigation')}</h3>
              <ul>
                <li><a href="#home">{t('home')}</a></li>
                <li><a href="#movies">{t('movies')}</a></li>
                <li><a href="#top-rated">{t('topRated')}</a></li>
                <li><a href="#upcoming">{t('upcoming')}</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>{t('categories')}</h3>
              <ul>
                <li><a href="#action">{t('action')}</a></li>
                <li><a href="#comedy">{t('comedy')}</a></li>
                <li><a href="#drama">{t('drama')}</a></li>
                <li><a href="#sci-fi">{t('sciFi')}</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>{t('legal')}</h3>
              <ul>
                <li><a href="#terms">{t('termsOfService')}</a></li>
                <li><a href="#privacy">{t('privacyPolicy')}</a></li>
                <li><a href="#about">{t('aboutUs')}</a></li>
                <li><a href="#contact">{t('contactUs')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {currentYear} Movie App. {t('allRightsReserved')}
            </p>
            <p className="footer-disclaimer">
              {t('tmdbDisclaimer')}
              <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer"> The Movie Database</a>.
            </p>
            <div className="tmdb-logo">
              <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;