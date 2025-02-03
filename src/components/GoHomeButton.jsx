

import React from "react";
import { useNavigate } from "react-router-dom";

const GoHomeButton = () => {
  const navigate = useNavigate(); 
  return (
    <button onClick={() => navigate("/")} className="go-home-button">
     🏠 Go Home
    </button>
  );
};

export default GoHomeButton;
