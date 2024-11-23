'use client';
import UserCardWrapper from '@/components/User/UserCardWrapper';
import SavedSearchList from '@/components/User/SavedSearchList';
import AddNewPreferenceButton from '@/components/User/PreferenceButton';
import { Box } from '@mui/material';
import { useGetUserQuery } from '@/store/services/userApi.js';
import { useLocation } from '@/hooks/useLocation';

export default function Page() {
  const { data: userData } = useGetUserQuery();
  const { 
    country,
    locality,
    isLoading: isLoadingLocation,
    error: isLocationError,
  } = useLocation();

  if (!userData || isLoadingLocation) {
    return <div>Loading...</div>;
  } 

  return (
    <Box
      sx={{
        bgcolor: 'background.main',
        padding: 1
      }}
    >
      <UserCardWrapper user={userData} locality={locality} country={country} />
      <br />
      <SavedSearchList savedSearches={userData.preferences} />
      <AddNewPreferenceButton />
    </Box>
  );
}
