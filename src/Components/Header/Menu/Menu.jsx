import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ searchActive }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Movies', href: '#' },
    { label: 'TV Shows', href: '#' },
    { label: 'Categories', href: '#' },
    { label: 'My List', href: '#' }
  ];

  return (
    <nav className={`menu-container ${searchActive ? 'menu-hidden' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="menu-icon"></span>
      </button>
      
      <ul className={`menu ${menuOpen ? 'menu-open' : ''}`}>
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <a href={item.href} className="menu-link">{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;