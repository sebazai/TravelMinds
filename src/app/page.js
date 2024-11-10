/* eslint-disable indent */
'use client';

import { useState } from 'react';
import { useLocation } from '@/hooks/useLocation';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map/Map'), {
  loading: () => <p>The great map of Earth is loading...</p>,
  ssr: false,
});

export default function Page() {
  const { location, position, isLoading, error } = useLocation();
  const [input, setInput] = useState('');
  const [places, setPlaces] = useState([]); // State to store places
  const [messages, setMessages] = useState([]);

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
            setMessages((currentMessages) => [
              ...currentMessages,
              { role: 'user', content: input },
            ]);

            const response = await fetch('/api/places/chat', {
              method: 'POST',
              body: JSON.stringify({
                messages: [...messages, { role: 'user', content: input }],
                data: { position, location },
              }),
            });

            const { messages: newMessages, ...rest } = await response.json();

            console.log(rest);
            setPlaces(
              rest.googleData.candidates.map((place) => {
                return {
                  name: place.name,
                  address: place.formatted_address,
                  justification: '',
                  coordinates: {
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  },
                };
              }),
            );

            setMessages((currentMessages) => [
              ...currentMessages,
              ...newMessages,
            ]);
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {typeof message.content === 'string'
            ? message.content
            : message.content
                .filter((part) => part.type === 'text')
                .map((part, partIndex) => (
                  <span key={partIndex}>{part.text}</span>
                ))}
        </div>
      ))}

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
