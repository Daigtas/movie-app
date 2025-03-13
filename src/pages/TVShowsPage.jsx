import React from 'react';
import TVShows from '../Components/TVShows';
import './pages.css';

const TVShowsPage = () => {
  return (
    <div className="content">
      <h1>TV Shows</h1>
      <p className="page-description">
        Explore our collection of TV series and shows. Find your next binge-worthy series!
      </p>
      <TVShows />
    </div>
  );
};

export default TVShowsPage;
