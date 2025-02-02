import React, { useState } from "react";
import ShowCard from "./ShowCard";

const ShowList = ({ shows, onToggleFavorite, favorites }) => {
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 12; // Adjust based on preference

  // Sorting function
  const sortedShows = [...shows].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "rating") {
      return (b.rating.average || 0) - (a.rating.average || 0);
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedShows.length / showsPerPage);
  const startIndex = (currentPage - 1) * showsPerPage;
  const paginatedShows = sortedShows.slice(startIndex, startIndex + showsPerPage);

  return (
    <div className="show-list-container">
      {/* Sorting Dropdown */}
      <div className="sorting-options">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Display Shows */}
      <div className="show-list">
        {paginatedShows.length === 0 ? (
          <p>No shows found.</p>
        ) : (
          paginatedShows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.some((fav) => fav.id === show.id)}
            />
          ))
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowList;
