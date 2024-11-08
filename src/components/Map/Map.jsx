"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { useRef, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { SelectionOverlay } from "@/components/Map/SelectionOverlay";
import L from "leaflet";
import { ItemMarker } from "./ItemMarker";
import { renderToString } from "react-dom/server";
import { SearchBar } from "./SearchBar";

const Map = (props) => {
  const { position, placesData: places } = props;

  const mapRef = useRef();

  useEffect(() => {
    // Wait until the map is initialized
    if (!mapRef.current) return;

    console.log("Running effect", places);
    // Add new markers for the data received
    const markers = places.map((item) => {
      const marker = L.marker([
        item.coordinates.latitude,
        item.coordinates.longitude,
      ]);
      marker.bindPopup(
        // Remove this useEffect if ItemMarker is used and cleanup for Layers is possible in other way
        renderToString(
          <>
            <h2>{item.name}</h2>
            <p>{item.address}</p>
            <p>{item.justification}</p>
            working hours: <b>0:00</b>- <b>0:00</b>
          </>,
        ),
      );
      marker.bindTooltip(item.name);
      marker.addTo(mapRef.current); // Adds marker to the map
      return marker;
    });

    // Cleanup function to remove markers when data changes
    return () => {
      markers.forEach((marker) => mapRef.current.removeLayer(marker));
    };
  }, [places]); // Runs whenever data changes

  if (!position) {
    return <div>Unable to retrieve your location</div>; // Handle error state
  }

  return (
    <div style={{ height: "100%" }}>
      <SearchBar />
      
        <SelectionOverlay
          location={position}
          chips={[
            "cycling",
            "jogging",
            "military museum",
            "soviet era related points of interest",
          ]}
        ></SelectionOverlay>

        <MapContainer
          ref={mapRef}
          style={{ height: "100%" }}
          center={position}
          zoom={13}
          zoomControl={false} // Disable default zoom control
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></TileLayer>
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      </div>
    
  );
};

export default Map;