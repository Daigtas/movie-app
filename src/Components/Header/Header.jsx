import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };
  
  const getNavLinkClass = ({ isActive }) => 
    isActive ? 'nav-link active' : 'nav-link';
  
  const getMobileNavLinkClass = ({ isActive }) => 
    isActive ? 'mobile-nav-link active' : 'mobile-nav-link';
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1 className="logo-text">
              Movie<span>App</span>
            </h1>
          </Link>
        </div>
        
        <nav className="nav">
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink to="/" className={getNavLinkClass} end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movies" className={getNavLinkClass}>Movies</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tv-shows" className={getNavLinkClass}>TV Shows</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/new-and-popular" className={getNavLinkClass}>New & Popular</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/my-list" className={getNavLinkClass}>My List</NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button" aria-label="Search">
              🔍
            </button>
          </form>
        </div>
        
        <div className="user-actions">
          <img
            src="/images/default-avatar.png"
            alt="User"
            className="user-avatar"
          />
        </div>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className={`hamburger-icon ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          <li className="mobile-nav-item">
            <NavLink to="/" className={getMobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
          </li>
          <li className="mobile-nav-item">
            <NavLink to="/movies" className={getMobileNavLinkClass} onClick={closeMobileMenu}>Movies</NavLink>
          </li>
          <li className="mobile-nav-item">
            <NavLink to="/tv-shows" className={getMobileNavLinkClass} onClick={closeMobileMenu}>TV Shows</NavLink>
          </li>
          <li className="mobile-nav-item">
            <NavLink to="/new-and-popular" className={getMobileNavLinkClass} onClick={closeMobileMenu}>New & Popular</NavLink>
          </li>
          <li className="mobile-nav-item">
            <NavLink to="/my-list" className={getMobileNavLinkClass} onClick={closeMobileMenu}>My List</NavLink>
          </li>
        </ul>
        
        <div className="mobile-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="mobile-search-input"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="mobile-user-info">
          <img
            src="/images/default-avatar.png"
            alt="User"
            className="mobile-avatar"
          />
          <span className="mobile-user-name">User Name</span>
        </div>
      </div>
      
      <div 
        className={`backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </header>
  );
};

export default Header;
