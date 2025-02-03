import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ show, onToggleFavorite, isFavorite }) => {
<<<<<<< HEAD
=======
  const defaultImage = "https://via.placeholder.com/210"; // Placeholder image

>>>>>>> eef966c (final development)
  return (
    <div className="show-card">
      <Link to={`/show/${show.id}`} className="show-link">
        <img
<<<<<<< HEAD
          src={show.image ? show.image.medium : "https://via.placeholder.com/210"}
=======
          src={show.image ? show.image.medium : defaultImage}
>>>>>>> eef966c (final development)
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

<<<<<<< HEAD
=======

>>>>>>> eef966c (final development)
export default ShowCard;
