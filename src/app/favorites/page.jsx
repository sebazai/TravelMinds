'use client';
import PlaceList from '@/components/favorites/PlaceList';
import { CircularProgress, Box } from '@mui/material';
import React from 'react';
import FavoritesBanner from '@/components/favorites/Favoritebanner';
import { useGetUserQuery } from '@/store/services/userApi.js';

export default function Page() {
  const {isError,  isLoading, data: userData} = useGetUserQuery();
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Box>Error: {isError}</Box>;
  }
  return (
    <div>
      <FavoritesBanner />
      <Box sx={{ marginTop: '70px', paddingX: 2 }}>
        <PlaceList favorites={userData.favorites} />
      </Box>
    </div>
  );
}
