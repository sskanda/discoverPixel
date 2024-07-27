import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./SearchPlaces.css";

const SearchPlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:5000/places");
        const options = response.data.map((place) => ({
          value: place,
          label: place,
        }));
        setPlaces(options);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post("http://localhost:5000/recommend", {
        place_name: selectedPlace.value,
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="container">
      <h1>Trending</h1>
      <Select
        options={places}
        onChange={setSelectedPlace}
        placeholder="Type or select a place"
        className="select-container"
      />
      <button onClick={fetchRecommendations} disabled={!selectedPlace}>
        Show Recommendation
      </button>

      <div className="results-container">
        {recommendations.recommended_books &&
          recommendations.recommended_books.map((book, index) => (
            <div key={index} className="result-card">
              <img src={recommendations.poster_url[index]} alt={book} />
              <p>{book}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPlaces;
