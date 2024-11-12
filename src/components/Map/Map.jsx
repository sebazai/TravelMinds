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

const Map = (props) => {
  const { position, placesData, fetchPlaces } = props;
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' });
  const [preferences, setPreferences] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setPreferences(data.preferences);
      });
  }, []);

  if (!position) {
    return <div>Unable to retrieve your location</div>; // Handle error state
  }
  console.log('PlacesData', placesData);

  return (
    <div style={{ height: '100%', minHeight: '50%' }}>
      <SelectionOverlay
        chips={preferences}
        onFetchPlaces={fetchPlaces}
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
        {placesData?.places &&
          placesData.places.map((item) => {
            return (
              <ItemMarker
                onFavoriteClick={(data) => {
                  console.log(data);
                  // Pass function that calls the favorite save API.
                }}
                item={item}
                key={item.address}
                icon={icon}
              />
            );
          })}
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
