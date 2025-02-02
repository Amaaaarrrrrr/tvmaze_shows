import React from "react";

const NavBar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="app-title">TV Shows Explorer</h1>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
