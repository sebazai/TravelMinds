'use client';

// IMPORTANT: the order matters!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { useRef, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { SelectionOverlay } from '@/components/Map/SelectionOverlay';
import L from 'leaflet';
import { ItemMarker } from './ItemMarker';
import { renderToString } from 'react-dom/server';
import { useChatMutation } from '@/store/services/chatApi';

const Map = (props) => {
  const { position, placesData: places } = props;
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' });
  const [preferences, setPreferences] = useState([]);
  const mapRef = useRef();
  const [chat, { isLoading, isSuccess, data, error }] = useChatMutation();

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setPreferences(data.preferences);
      });
  }, []);
  useEffect(() => {
    // Wait until the map is initialized
    if (!mapRef.current) return;

    console.log('Running effect', places);
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
    <div style={{ height: '100%' }}>
      <SelectionOverlay
        location={position}
        chips={preferences}
        chat={chat}
      ></SelectionOverlay>
      <MapContainer
        ref={mapRef}
        style={{ height: '100%' }}
        center={position}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {data &&
          data.places.map((item) => {
            return <ItemMarker item={item} key={item.address} icon={icon} />;
          })}
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
