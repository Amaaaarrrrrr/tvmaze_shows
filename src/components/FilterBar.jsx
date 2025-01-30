import React from "react";

function FilterBar({ genres, onFilter }) {
  // Render a dropdown menu with the list of genres
  return (
    <div>
      <h3>Filter by Genre</h3>
      <select onChange={(e) => onFilter(e.target.value)} defaultValue="">
        <option value="">Select Genre</option>
        {/* Loop through the genres and create an option for each */}
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
