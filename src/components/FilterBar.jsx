import React, { useState } from "react";

const FilterBar = ({ onFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    onFilter(e.target.value, selectedRating);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
    onFilter(selectedGenre, e.target.value);
  };

  return (
    <div className="filter-bar">
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="filter-select"
      >
        <option value="">All Genres</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Action">Action</option>
        <option value="Horror">Horror</option>
        <option value="Romance">Romance</option>
      
      </select>

      <select
        value={selectedRating}
        onChange={handleRatingChange}
        className="filter-select"
      >
        <option value="">All Ratings</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
        <option value="9">9+</option>
        
      </select>
    </div>
  );
};

export default FilterBar;
