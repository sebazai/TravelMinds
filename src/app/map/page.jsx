"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Remove SSR for MapComponent, Leaflet uses window requiring client-side rendering
const MapComponent = dynamic(() => import("../../components/Map/Map"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function Page() {
  const [input, setInput] = useState("");
  const [position, setPosition] = useState(null); // State to store user's position

  useEffect(() => {
    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]); // Update position state with coordinates
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  if (!position) {
    return <div>Fetching user position...</div>; // Handle error state
  }
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <p>Location: {JSON.stringify(position)}</p>
      <input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            const response = await fetch("/api/places", {
              method: "POST",
              body: JSON.stringify({
                prompt: input,
                data: { location: position },
              }),
            });

            const places = await response.json();
            console.log(places);
          }
        }}
      />
      <MapComponent position={position} />
    </div>
  );
}
