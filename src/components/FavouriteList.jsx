import React from "react";

function FavoriteList({ shows, favorites, onToggleFavorite }) {
  return (
    <div className="favorite-list">
      <h2>Your Favorite TV Shows</h2>
      {favorites.length === 0 ? (
        <p>No favorites selected yet.</p>
      ) : (
        <ul>
          {favorites.map((show) => (
            <li key={show.id}>
              {show.name}
              <button onClick={() => onToggleFavorite(show)}>:star: Remove</button>
            </li>
          ))}
        </ul>
      )}

  <h3>All TV Shows</h3>
  <ul>
    {shows.map((show) => (
      <li key={show.id}>
        {show.name}
        <button onClick={() => onToggleFavorite(show)}>
          {favorites.some((fav) => fav.id === show.id) ? "⭐ Remove" : "☆ Add"}
        </button>
      </li>
    ))}
  </ul>
</div>
  );
}

export default FavoriteList;