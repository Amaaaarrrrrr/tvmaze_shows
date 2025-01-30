import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmounting

fetch(`https://api.tvmaze.com/shows/${id}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch show details.");
    }
    return res.json();
  })
  .then((data) => {
    if (isMounted) setShow(data);
  })
  .catch((err) => {
    if (isMounted) setError(err.message);
  });

return () => {
  isMounted = false; // Cleanup function
};
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!show) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h1>{show.name}</h1>
      <img src={show.image?.original || "https://via.placeholder.com/400"} alt={show.name} />
      <p>{show.summary ? show.summary.replace(/<[^>]+>/g, "") : "No summary available."}</p>
      <p>📌 Language: {show.language || "Unknown"}</p>
      <p>🎭 Type: {show.type || "N/A"}</p>
      <p>⌛ Runtime: {show.averageRuntime ? `${show.averageRuntime} min` : "N/A"}</p>
      <p>📅  Premiered: {show.premiered || "N/A"}</p>
      {show.officialSite && (
        <p>
           🔗 <a href={show.officialSite} target="_blank" rel="noopener noreferrer">Official Site</a>
        </p>
      )}
    </div>
  );
};

export default ShowDetails;

