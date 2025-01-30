import React from "react";
import ShowCard from "./ShowCard";

const ShowList = ({ shows, onFavoriteToggle, onMoreDetails, isLoading }) => {
  if (isLoading) {
    return <p className="loading">Loading shows... ⌛️</p>;
  }

  return (
    <div className="show-list">
      {shows.length > 0 ? (
        shows.map((show) => (
          <ShowCard 
            key={show.id} 
            show={show} 
            onFavoriteToggle={onFavoriteToggle} 
            onMoreDetails={onMoreDetails} 
          />
        ))
      ) : (
        <p className="no-results">No shows found. Try searching for something else! :x:</p>
      )}
    </div>
  );
};

export default ShowList;