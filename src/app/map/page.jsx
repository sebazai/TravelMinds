'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useLocation } from '@/hooks/useLocation';

const Map = dynamic(() => import('@/components/Map/Map'), {
  loading: () => <p>The great map of Earth is loading...</p>,
  ssr: false,
});

export default function Page() {
  const [input, setInput] = useState('');
  const [places, setPlaces] = useState([]); // State to store places
  const { location, position, isLoading, error } = useLocation();

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

  if (isLoading) {
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
