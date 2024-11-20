'use client';

// IMPORTANT: the order matters!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { SelectionOverlay } from '@/components/Map/SelectionOverlay';
import L from 'leaflet';
import { ItemMarker } from './ItemMarker';
import { useGetUserQuery } from '@/store/services/userApi.js';

const Map = (props) => {
  const { position, placesData, fetchPlaces, children } = props;
  const icon = L.icon({ iconUrl: '/images/marker-icon.png'
    , iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [20, -25], tooltipAnchor: [0, -60]
   });
  const locationIcon = L.icon({
    iconUrl: '/images/currentLocation-icon.png',
    shadowUrl: '/images/currentLocation-shadow.png',
    iconSize: [40, 40],
    shadowSize: [40, 40],
    iconAnchor: [20, 20],
  });
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
        style={{ height: '100%', backgroundColor: 'rgb(30, 30, 40)' }}
        center={position}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
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
                item={favoriteItem}
                key={item.address}
                icon={icon}
              />
            );
          })}
        <Marker position={position} icon={locationIcon}>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
