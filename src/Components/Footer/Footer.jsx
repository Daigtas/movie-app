import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const footerLinks = {
    explore: [
      { label: 'Movies', path: '/movies' },
      { label: 'TV Shows', path: '/tv-shows' },
      { label: 'New & Popular', path: '/new-and-popular' },
      { label: 'My List', path: '/my-list' }
    ],
    info: [
      { label: 'About Us', path: '/about' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Contact Us', path: '/contact' }
    ],
    social: [
      { label: 'Facebook', url: 'https://facebook.com', icon: 'f' },
      { label: 'Twitter', url: 'https://twitter.com', icon: 't' },
      { label: 'Instagram', url: 'https://instagram.com', icon: 'i' },
      { label: 'YouTube', url: 'https://youtube.com', icon: 'y' }
    ]
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Movie App</h3>
          <p>Your ultimate destination for browsing movies, checking ratings, and watching trailers.</p>
          <div className="social-icons">
            {footerLinks.social.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Explore</h3>
          <ul className="footer-links">
            {footerLinks.explore.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Information</h3>
          <ul className="footer-links">
            {footerLinks.info.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Movie App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;