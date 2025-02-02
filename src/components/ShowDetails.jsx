import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GoHomeButton from "./GoHomeButton";

const ShowDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [showDetails, setShowDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch show details");
        }
        const data = await response.json();
        setShowDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]); 

  if (loading) {
    return <div className="loading">Loading...</div>; 
  }

  if (error) {
    return <div className="error">Error: {error}</div>; 
  }

 
  return (
    <div className="show-details">
      <h2>{showDetails.name}</h2>
      
      <img 
        src={showDetails.image?.medium || 'default-image-url'} 
        alt={showDetails.name || 'No Image Available'} 
      />
      
      <div className="show-summary">
        <p dangerouslySetInnerHTML={{ __html: showDetails.summary }} />
      </div>

      <div className="show-meta">
        <p><strong>Genres:</strong> {showDetails.genres.join(", ")}</p>
        <p><strong>Rating:</strong> {showDetails.rating.average}</p>
        <p><strong>Language:</strong> {showDetails.language}</p>
      </div>

      <div className="external-links">
        {showDetails.externals && (
          <>
            {showDetails.externals.wikipedia && (
              <a 
                href={`https://en.wikipedia.org/wiki/${showDetails.externals.wikipedia}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            )}
            {showDetails.externals.imdb && (
              <a 
                href={`https://www.imdb.com/title/${showDetails.externals.imdb}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                IMDB
              </a>
            )}
          </>
        )}
      </div>
       <GoHomeButton /> 
      </div>
  );
};

export default ShowDetails;
