'use client';

// IMPORTANT: the order matters!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { SelectionOverlay } from '@/components/Map/SelectionOverlay';
import L from 'leaflet';
import { ItemMarker } from './ItemMarker';
import { useGetUserQuery } from '@/store/services/userApi.js';
import { SearchBar } from './SearchBar';

const Map = (props) => {
  const { position, placesData, fetchPlaces } = props;
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' });
  const mapRef = useRef();
  const { data: userData, isLoading: isLoadingUserData } = useGetUserQuery();

  console.log('userData', userData);
  console.log('PlacesData', placesData);

  if (!position) {
    return <div>Unable to retrieve your location</div>; // Handle error state
  }

  if (isLoadingUserData) {
    return <div>Loading...</div>; // Handle loading state
  }

  const saveFavorite = async (data) => {
    console.log('Call the API to save the favorite', data);
  };

  return (
    <div style={{ height: '100%', minHeight: '50%' }}>
      <SearchBar onFetchPlaces={fetchPlaces} />

      <SelectionOverlay
        chips={userData.preferences}
        onFetchPlaces={fetchPlaces}
      ></SelectionOverlay>
      <MapContainer
        ref={mapRef}
        style={{ height: '100%' }}
        center={position}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {placesData?.places &&
          placesData.places.map((item) => {
            return (
              <ItemMarker
                onFavoriteClick={async (data) => {
                  await saveFavorite(data);
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
