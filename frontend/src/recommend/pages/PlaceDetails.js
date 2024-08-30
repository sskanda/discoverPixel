import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlaceDetails.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceDetails = () => {
  const { placeName } = useParams();
  const navigate = useNavigate();
  const [placeDetails, setPlaceDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_RECOMMENDATION_BASE_URL}/place/${placeName}`
        );
        setPlaceDetails(response.data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_RECOMMENDATION_BASE_URL}/recommend`,
          {
            place_name: placeName,
          }
        );
        const recommendedPlaces = response.data.recommended_places;
        const posterUrls = response.data.poster_url;

        // Combine the names and URLs into one array of objects
        const recommendationsData = recommendedPlaces.map((name, index) => ({
          name,
          image: posterUrls[index] || "", // Ensure there's a fallback if no URL
        }));

        setRecommendations(recommendationsData);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchPlaceDetails();
    fetchRecommendations();
  }, [placeName]);

  // Navigate to the details page of the clicked place with a loading screen
  const handleRecommendationClick = (placeName) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/place/${placeName}`);
      setIsLoading(false);
    }, 500);
  };

  if (isLoading || !placeDetails) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <div className="place-details-container">
      <img
        src={placeDetails.image}
        alt={placeDetails.name}
        className="place-image"
      />
      <div className="place-info">
        <h1>{placeDetails.name}</h1>
        <p>{placeDetails.description}</p>
      </div>

      {/* New Section for Recommendations */}
      <div className="recommendations-section">
        <h2>YOU MAY ALSO LIKE</h2>
        <div className="recommendations-container">
          {recommendations.length > 0 ? (
            recommendations.map((recommendation, index) => (
              <div
                className="recommendation-card"
                key={index}
                onClick={() => handleRecommendationClick(recommendation.name)}
              >
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  className="recommendation-image"
                />
                <div className="recommendation-info">
                  <h3>{recommendation.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
