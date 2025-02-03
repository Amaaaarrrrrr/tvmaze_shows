import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ShowList from "./components/ShowList";
import FavoriteList from "./components/FavoriteList";
import ShowDetails from "./components/ShowDetails";

const App = () => {
  const [shows, setShows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShows, setFilteredShows] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        const data = await response.json();
        setShows(data);
        setFilteredShows(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };
    fetchShows();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = shows.filter((show) =>
      show.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredShows(filtered);
  };

  const toggleFavorite = (show) => {
    if (favorites.some((fav) => fav.id === show.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== show.id));
    } else {
      setFavorites([...favorites, show]);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFilter = (genre, rating) => {
    setSelectedGenre(genre);
    setSelectedRating(rating);

    let filtered = shows;

    if (genre) {
      filtered = filtered.filter((show) => show.genres.includes(genre));
    }
    if (rating) {
      filtered = filtered.filter((show) => show.rating.average && show.rating.average >= parseFloat(rating));
    }

    setFilteredShows(filtered);
  };

  return (
    <Router>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

<<<<<<< HEAD
        
        <Link to="/favorites">
          <button className="button_home">Go to Favorite Shows</button>
=======
        {/* Button to go to the favorites page */}
        <Link to="/favorites">
          <button>Go to Favorite Shows</button>
>>>>>>> eef966c (final development)
        </Link>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
                <FilterBar onFilter={handleFilter} />
                <ShowList
                  shows={filteredShows}
                  onToggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              </>
            }
          />
          <Route
            path="/favorites"
            element={<FavoriteList favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
