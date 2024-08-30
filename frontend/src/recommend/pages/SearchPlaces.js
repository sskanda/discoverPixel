import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import { MdTrendingUp } from "react-icons/md";
import "./SearchPlaces.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const SearchPlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_RECOMMENDATION_BASE_URL}/places`
        );
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
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_RECOMMENDATION_BASE_URL}/recommend`,
        {
          place_name: selectedPlace.value,
        }
      );
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
  };

  return (
    <div className="container">
      <h1 style={{ color: "white", display: "flex", alignItems: "center" }}>
        <MdTrendingUp style={{ marginRight: "10px", fontSize: "24px" }} />
        Trending
      </h1>
      <Select
        options={places}
        onChange={setSelectedPlace}
        placeholder="Type or select a place"
        className="select-container"
        styles={customStyles}
      />
      <button onClick={fetchRecommendations} disabled={!selectedPlace}>
        Show Recommendation
      </button>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="results-container">
          {recommendations.recommended_places &&
            recommendations.recommended_places.map((place, index) => (
              <Link to={`/place/${place}`} key={index} className="result-card">
                <img src={recommendations.poster_url[index]} alt={place} />
                <p>{place}</p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchPlaces;
