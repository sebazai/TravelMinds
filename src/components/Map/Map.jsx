'use client';

// IMPORTANT: the order matters!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { SelectionOverlay } from '@/components/Map/SelectionOverlay';
import L from 'leaflet';
import { ItemMarker } from './ItemMarker';
import { useGetUserQuery } from '@/store/services/userApi.js';
import { SearchBar } from "./SearchBar";

const Map = (props) => {
  const { position, placesData, fetchPlaces } = props;
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' });
  const mapRef = useRef();
  const { data: userData, isLoading: isLoadingUserData } = useGetUserQuery();

  console.log('userData', userData);

  if (!position) {
    return <div>Unable to retrieve your location</div>; // Handle error state
  }

  if (isLoadingUserData) {
    return <div>Loading...</div>; // Handle loading state
  }
  console.log('PlacesData', placesData);

  return (
    <div style={{ height: '100%', minHeight: '50%' }}>
      <SearchBar />

      <SelectionOverlay
        chips={userData.preferences}
        onFetchPlaces={fetchPlaces}
      ></SelectionOverlay>
      <MapContainer
        ref={mapRef}
        style={{ height: '100%' }}
        center={position}
        zoom={13}
        zoomControl={false} // Disable default zoom control

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