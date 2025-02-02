import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ show, onToggleFavorite, isFavorite }) => {
  return (
    <div className="show-card">
      <Link to={`/show/${show.id}`} className="show-link">
        <img
          src={show.image ? show.image.medium : "https://via.placeholder.com/210"}
          alt={show.name}
          className="show-image"
        />
        <h3>{show.name}</h3>
      </Link>
      <p>⭐ {show.rating.average ? show.rating.average : "N/A"}</p>
      <button onClick={() => onToggleFavorite(show)} className="favorite-btn">
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default ShowCard;
