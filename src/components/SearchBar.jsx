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
        placeholder="Search for a show..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
