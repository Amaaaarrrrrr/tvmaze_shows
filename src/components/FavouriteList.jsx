import React from "react";
import ShowCard from "./ShowCard";  // Import ShowCard component
import GoHomeButton from "./GoHomeButton";

const FavoriteList = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="favorite-list">
      {favorites.length === 0 ? (
        <p>No favorite shows added yet.</p> // If no favorites, display this message
      ) : (
        favorites.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            onToggleFavorite={onToggleFavorite}
            isFavorite={true} // Indicate it's a favorite
          />
        ))
      )}
       <GoHomeButton /> {/* Add the GoHomeButton component */}
    </div>
  );
};

export default FavoriteList;
