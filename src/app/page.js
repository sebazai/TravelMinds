/* eslint-disable indent */
'use client';

import { useEffect, useState } from 'react';
import { useLocation } from '@/hooks/useLocation';
import dynamic from 'next/dynamic';
import {
  usePlacesChatMutation,
  usePlacesMutation,
} from '@/store/services/placesApi';

const Map = dynamic(() => import('@/components/Map/Map'), {
  loading: () => <p>The great map of Earth is loading...</p>,
  ssr: false,
});

export default function Page() {
  const { location, position, isLoading, error } = useLocation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const [placesChat, { data: placesChatData, reset }] = usePlacesChatMutation();
  const [places, { data: placesData }] = usePlacesMutation();

  useEffect(() => {
    if (placesChatData) {
      setMessages((currentMessages) => [
        ...currentMessages,
        ...placesChatData.messages,
      ]);
    }
  }, [placesChatData]);

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

            placesChat({
              messages: [...messages, { role: 'user', content: input }],
              location,
              position,
            });
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`}>
          {message.role === 'user' ? 'User: ' : 'TravelBuddy: '}
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
          placesData={placesChatData ?? placesData}
          fetchPlaces={(data) => {
            reset();
            console.log('calling selectionoverlay with', data);
            places({ ...data, location });
          }}
        />
      )}
    </div>
  );
}
