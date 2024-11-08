'use client';
import userData from './settingsInfo.json';
import UserCardWrapper from '@/components/User/UserCardWrapper';
import SavedSearchList from '@/components/User/SavedSearchList';
import AddNewPreferenceButton from '@/components/User/PreferenceButton';
import { Box } from '@mui/material'; 
import { useState, useEffect } from 'react';

export default function Page() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }
  , []);

  
  if (!userData) {

    return <div>Loading...</div>;

  }else{
    console.log(userData.preferences);
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.main',
        padding: 1, 
      }}
    >
      <UserCardWrapper user={userData} />
      <br/>
      <SavedSearchList savedSearches={userData.preferences} />
      <AddNewPreferenceButton/>
    </Box>
  );
}
