"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/Map/Map"), {
  loading: () => <p>The great map of Earth is loading...</p>,
  ssr: false,
});

export default function Page() {
  const [input, setInput] = useState("");
  const [position, setPosition] = useState(null); // State to store user's position
  const [places, setPlaces] = useState([]); // State to store places

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
        },
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
            setPlaces(places);
          }
        }}
      />
      {position && <Map position={position} placesData={places} />}
    </div>
  );
}
