import React from "react";

const ShowCard = ({ show, onFavoriteToggle, onMoreDetails }) => {
  return (
    <div className="show-card">
      <img src={show.image?.medium || "https://via.placeholder.com/210x295"} alt={show.name} />
      <h3>{show.name}</h3>
      <button onClick={() => onFavoriteToggle(show)}>
        {show.isFavorite ? "★" : "☆"}
      </button>
      <button onClick={() => onMoreDetails(show)}>More Info</button>
    </div>
  );
};

export default ShowCard;