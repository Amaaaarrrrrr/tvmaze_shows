import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) throw new Error("Failed to fetch show details.");
        
        const data = await response.json();
        if (isMounted) {
          setShow(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchShowDetails();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [id]);

  if (isLoading) return <p className="loading">Loading show details... ⌛️</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="show-details">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      
      <h1>{show.name}</h1>
      <img 
        src={show.image?.original || "https://via.placeholder.com/400"} 
        alt={show.name} 
        className="show-image"
      />
      <p className="summary">
        {show.summary ? show.summary.replace(/<[^>]+>/g, "") : "No summary available."}
      </p>
      
      <div className="show-info">
        <p>🌍 Language: {show.language || "Unknown"}</p>
        <p>🎭 Type: {show.type || "N/A"}</p>
        <p>⏳ Runtime: {show.averageRuntime ? `${show.averageRuntime} min` : "N/A"}</p>
        <p>📅 Premiered: {show.premiered || "N/A"}</p>
        {show.officialSite && (
          <p>🔗 <a href={show.officialSite} target="_blank" rel="noopener noreferrer">Official Site</a></p>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
