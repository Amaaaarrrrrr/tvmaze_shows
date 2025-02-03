import React from "react";

const SearchBar = ({ searchQuery, onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
<<<<<<< HEAD
        placeholder="Search for a show..."
=======
        placeholder="🔍                  Search for a show..."
>>>>>>> eef966c (final development)
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
