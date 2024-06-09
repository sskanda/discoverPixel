// Mapbox and React
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

const Map = (props) => {
  console.log(props.location);
  const mapContainer = useRef(null);
  const map = useRef(null);
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2t6eCIsImEiOiJjbHg2ZTVxb2MwcjZ5MmpzYTFkZHR4cXJ6In0.REegpreuWM6kERLY4HH3Iw";
  const { lng, lat } = props.location;
  const zoom = 12;
  const mapStyle = "mapbox://styles/rolodoom/cle5tsdez001801pft83htnau";

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map(
      {
        container: mapContainer.current,
        //style: mapStyle,
        center: [lng, lat],
        zoom: zoom,
      },
      [lng, lat]
    );

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(map.current);
  });

  return (
    <div
      ref={mapContainer}
      className={`map ${props.className}`}
      style={props.style}
    />
  );
};

export default Map;
