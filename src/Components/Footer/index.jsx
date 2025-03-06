import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-text">MovieApp</span>
          <p>© {new Date().getFullYear()} MovieApp. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <div className="footer-links-column">
            <h3>{t('aboutUs')}</h3>
            <ul>
              <li><a href="/about">{t('aboutUs')}</a></li>
              <li><a href="/contact">{t('contactUs')}</a></li>
              <li><a href="/terms">{t('termsOfService')}</a></li>
              <li><a href="/privacy">{t('privacyPolicy')}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <button className="back-to-top" onClick={handleBackToTop}>
        {t('backToTop')} ↑
      </button>
    </footer>
  );
};

export default Footer;
