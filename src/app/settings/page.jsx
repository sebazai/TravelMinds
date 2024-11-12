'use client';
import UserCardWrapper from '@/components/User/UserCardWrapper';
import SavedSearchList from '@/components/User/SavedSearchList';
import AddNewPreferenceButton from '@/components/User/PreferenceButton';
import { Box } from '@mui/material';
import { useGetUserQuery } from '@/store/services/userApi.js';

export default function Page() {
  const { data: userData } = useGetUserQuery();
  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      sx={{
        bgcolor: 'background.main',
        padding: 1
      }}
    >
      <UserCardWrapper user={userData} />
      <br />
      <SavedSearchList savedSearches={userData.preferences} />
      <AddNewPreferenceButton />
    </Box>
  );
}
