import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterBar from "./FilterBar.jsx";
import ShowList from "./ShowList.jsx";
import FavoriteList from "./FavoriteList.jsx";
import "./App.css";

const App = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchShows = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      if (!response.ok) throw new Error("Failed to fetch data.");
      
      const data = await response.json();
      const extractedShows = data.map((item) => item.show);
      setShows(extractedShows);
      setFilteredShows(genre ? extractedShows.filter((show) => show.genres.includes(genre)) : extractedShows);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchShows();
    }, 500); // Delay search by 500ms to debounce

    return () => clearTimeout(timer); // Cleanup timer on query change
  }, [query]);

  useEffect(() => {
    setFilteredShows(genre ? shows.filter((show) => show.genres.includes(genre)) : shows);
  }, [genre, shows]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleFilter = (selectedGenre) => {
    setGenre(selectedGenre);
  };

  const handleFavoriteToggle = (show) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === show.id)
        ? prevFavorites.filter((fav) => fav.id !== show.id)
        : [...prevFavorites, show]
    );
  };

  const handleToggleDarkMode = (newMode) => {
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <Navbar onToggleDarkMode={handleToggleDarkMode} isDarkMode={isDarkMode} />
      <div className="main-content">
        <SearchBar onSearch={handleSearch} />
        <FilterBar genres={["Drama", "Comedy", "Action", "Romance"]} onFilter={handleFilter} />

        {isLoading ? (
          <p>Loading shows...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            {filteredShows.length === 0 && !isLoading && !error && (
              <p>No shows found. Try searching with different keywords or genres.</p>
            )}
            <ShowList shows={filteredShows} onFavoriteToggle={handleFavoriteToggle} />
          </>
        )}

        <FavoriteList favorites={favorites} onToggleFavorite={handleFavoriteToggle} />
      </div>
    </div>
  );
};

export default App;
