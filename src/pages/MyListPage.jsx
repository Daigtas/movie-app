import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieGrid from '../Components/MovieGrid';
import './pages.css';

const MyListPage = ({ movies }) => {
  const [myList, setMyList] = useState([]);
  useEffect(() => {
    if (movies && movies.length) {
      const savedMovies = [...movies]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setMyList(savedMovies);
    }
  }, [movies]);
  return (
    <div className="content">
      <h1>My List</h1>
      
      {myList.length > 0 ? (
        <>
          <p className="page-description">
            Your saved movies and shows. Click on a title to see more details or remove it from your list.
          </p>
          <MovieGrid movies={myList} title="Saved Titles" />
        </>
      ) : (
        <div className="empty-list">
          <h3>Your list is empty</h3>
          <p>Browse movies and shows and add them to your list to keep track of what you want to watch.</p>
          <Link to="/movies" className="hero-button primary">Browse Movies</Link>
        </div>
      )}
    </div>
  );
};

export default MyListPage;
