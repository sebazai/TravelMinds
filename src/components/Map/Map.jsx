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

const Map = (props) => {
  const { position, placesData, fetchPlaces, children } = props;
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' });
  const mapRef = useRef();
  const { data: userData, isLoading: isLoadingUserData, refetch } = useGetUserQuery();

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

    fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.name,
        location: data.address,
        coordinates: data.coordinates,
        rating: data.rating,
        description: data.justification,
        photo: data.photo,
        createdBy: userData._id,
      }),
    }).then(()=>refetch());

  };

  return (
    <div style={{ height: '100%', minHeight: '50%' }}>
      {children}

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
            const computedPhoto =`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`;
            const computedRating = (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1);
            const favoriteItem = {
              ...item,
              photo: computedPhoto,
              rating: computedRating,
            };
            return (
              <ItemMarker
                onFavoriteClick={async (data) => {
                  await saveFavorite(data);
                }}
                item={favoriteItem
                }
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
