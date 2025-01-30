import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import SearchBar from './SearchBar.jsx';
import FilterBar from './FilterBar.jsx';
import ShowList from './ShowList.jsx';
import FavoriteList from './FavoriteList.jsx';
import ShowDetails from './ShowDetails.jsx'; // Importing ShowDetails
import './App.css'; // Ensure you have the styles for your app

const App = () => {
  const [shows, setShows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShows = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = await response.json();
      const filteredShows = genre ? data.filter(show => show.show.genres.includes(genre)) : data;
      setShows(filteredShows);
    } catch (error) {
      console.error('Error fetching shows:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleFilter = (selectedGenre) => {
    setGenre(selectedGenre);
  };

  const handleFavoriteToggle = (show) => {
    setFavorites(prevFavorites =>
      prevFavorites.some(fav => fav.id === show.id)
        ? prevFavorites.filter(fav => fav.id !== show.id)
        : [...prevFavorites, show]
    );
  };

  const handleToggleDarkMode = (newMode) => {
    setIsDarkMode(newMode);
  };

  useEffect(() => {
    if (query) {
      fetchShows();
    }
  }, [query, genre]);

  return (
    <Router>
      <div className={isDarkMode ? 'dark' : 'light'}>
        <Navbar onToggleDarkMode={handleToggleDarkMode} isDarkMode={isDarkMode} />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar onSearch={handleSearch} />
                  <FilterBar genres={['Drama', 'Comedy', 'Action', 'Romance']} onFilter={handleFilter} />
                  <ShowList
                    shows={shows}
                    onFavoriteToggle={handleFavoriteToggle}
                    isLoading={isLoading}
                  />
                  <FavoriteList
                    shows={shows}
                    favorites={favorites}
                    onToggleFavorite={handleFavoriteToggle}
                  />
                </>
              }
            />
            <Route path="/show/:id" element={<ShowDetails />} /> {/* Route for ShowDetails */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
