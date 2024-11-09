'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('@/components/Map/Map'), {
  loading: () => <p>The great map of Earth is loading...</p>,
  ssr: false,
});

export default function Page() {
  const [input, setInput] = useState('');
  const [position, setPosition] = useState(null); // State to store user's position
  const [places, setPlaces] = useState([]); // State to store places
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]); // Update position state with coordinates
        },
        (error) => {
          console.error('Error getting location: ', error);
        },
      );
    }
  }, []);

  useEffect(() => {
    if (position) {
      fetch('/api/places/name', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            latitude: position[0],
            longitude: position[1],
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLocation(data.location);
        });
    }
  }, [position]);

  const fetchPlaces = async (input) => {
    const response = await fetch('/api/places', {
      method: 'POST',
      body: JSON.stringify({
        prompt: input,
        data: { location: location },
      }),
    });

    const places = await response.json();
    const enrichPlaces = await Promise.all(
      places.places.map(async (place) => {
        const addressToLatLon = await fetch('/api/places/address', {
          method: 'POST',
          body: JSON.stringify({ address: place.address }),
        });
        const data = await addressToLatLon.json();
        return {
          ...place,
          address: data.address,
          coordinates: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
        };
      }),
    );
    setPlaces(enrichPlaces);
  };

  if (!position) {
    return <div>Fetching user position...</div>; // Handle error state
  }
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <p>Location: {location}</p>
      <input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === 'Enter') {
            await fetchPlaces(input);
          }
        }}
      />
      {position && (
        <Map
          position={position}
          placesData={places}
          fetchPlaces={fetchPlaces}
        />
      )}
    </div>
  );
}
