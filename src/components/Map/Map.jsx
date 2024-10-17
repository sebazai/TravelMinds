'use client'
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Map = () => {
  const [position, setPosition] = useState(null); // State to store user's position
  const [loading, setLoading] = useState(true);  // Loading state for geolocation

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]); // Update position state with coordinates
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location: ", error);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div>Loading map...</div>; // Show a loading state
  }

  if (!position) {
    return <div>Unable to retrieve your location</div>; // Handle error state
  }
  return (<div>
    <MapContainer style={{height: 'calc(100vh - 60px)'}} center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  </MapContainer>,
  </div>)
}