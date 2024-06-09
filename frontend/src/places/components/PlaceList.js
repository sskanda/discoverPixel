import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
  const auth = useContext(AuthContext);
  if (props.items == null || props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          {auth.isLoggedIn ? (
            <h2>No places found. Maybe create one?</h2>
          ) : (
            <h2>No places found. Maybe login and create one?</h2>
          )}
          {auth.isLoggedIn && <Button to="/places/new">Share Place</Button>}
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list center">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
