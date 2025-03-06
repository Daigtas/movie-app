import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelect.css';

const FLAGS = {
  en: '/images/flags/en.svg',
  lt: '/images/flags/lt.svg'
};

const LanguageSelect = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-select-container" ref={dropdownRef}>
      <button 
        className="language-select-button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label={t('language')}
      >
        <img 
          src={FLAGS[language]} 
          alt={language === 'en' ? 'English' : 'Lithuanian'} 
          className="language-flag"
        />
        <span className="language-code">{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <button
            className={`language-option ${language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageSelect('en')}
          >
            <img src={FLAGS.en} alt="English Flag" className="language-flag" />
            <span>EN</span>
          </button>
          <button
            className={`language-option ${language === 'lt' ? 'active' : ''}`}
            onClick={() => handleLanguageSelect('lt')}
          >
            <img src={FLAGS.lt} alt="Lithuanian Flag" className="language-flag" />
            <span>LT</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
