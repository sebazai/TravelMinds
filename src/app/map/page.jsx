'use client';

import dynamic from 'next/dynamic';
import { SearchBar } from '@/components/Map/SearchBar';
import { useLocation } from '@/hooks/useLocation';
import { usePlacesMutation } from '@/store/services/placesApi';

const Map = dynamic(() => import('@/components/Map/Map'), {
  loading: () => <p>The great map of Earth is loading...</p>,
  ssr: false,
});

export default function Page() {
  const {
    location,
    position,
    isLoading: isLoadingLocation,
    error: isLocationError,
  } = useLocation();

  const [places, { isLoading, isSuccess, data, error }] = usePlacesMutation();

  if (isLoadingLocation) {
    return <div>Fetching user position...</div>; // Handle error state
  }
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {position && (
        <Map
          position={position}
          placesData={data}
          fetchPlaces={(data) => {
            console.log('calling with', data);
            places({ ...data, location });
          }}
        >
          <SearchBar onFetchPlaces={(data) => places({ ...data, location })} />
        </Map>
      )}
    </div>
  );
}
