import React from "react";
import ShowCard from "./ShowCard";  
import GoHomeButton from "./GoHomeButton";

const FavoriteList = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="favorite-list">
      {favorites.length === 0 ? (
        <p>No favorite shows added yet.</p> 
      ) : (
        favorites.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            onToggleFavorite={onToggleFavorite}
            isFavorite={true} 
          />
        ))
      )}
       <GoHomeButton /> 
    </div>
  );
};

export default FavoriteList;
