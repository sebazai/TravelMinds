"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { useRef, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ItemMarker } from "@/components/Map/ItemMarker";
import { SelectionOverlay } from "@/components/Map/SelectionOverlay";
import L from "leaflet";

const Map = (props) => {
  const { position, placesData } = props;

  const mapRef = useRef();

  useEffect(() => {
    // Wait until the map is initialized
    if (!mapRef.current) return;

    console.log("Running effect", placesData);
    // Add new markers for the data received
    const markers = placesData.places.map((item) => {
      const marker = L.marker([
        item.coordinates.latitude,
        item.coordinates.longitude,
      ]);
      marker.bindPopup(`<p>${item.name}</p>`);
      marker.addTo(mapRef.current); // Adds marker to the map
      return marker;
    });

    // Cleanup function to remove markers when data changes
    return () => {
      markers.forEach((marker) => mapRef.current.removeLayer(marker));
    };
  }, [placesData]); // Runs whenever data changes

  if (!position) {
    return <div>Unable to retrieve your location</div>; // Handle error state
  }

  return (
    <div style={{ height: "100%" }}>
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
