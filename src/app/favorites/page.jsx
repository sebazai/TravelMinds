'use client';
import PlaceList from '@/components/favorites/PlaceList';
import { CircularProgress, Box } from '@mui/material';
import React from 'react';
import Banner from '@/components/global/Banner';
import { useGetUserQuery } from '@/store/services/userApi.js';

export default function Page() {
  const { isError, isLoading, data: userData, refetch } = useGetUserQuery();

  const deleteFavorite = async (id) => {
    const response = await fetch(`/api/favorites/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(() => refetch());
  };

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
      <Banner title="MY FAVORITES" />
      <Box sx={{ marginTop: '70px', paddingX: 2 }}>
        <PlaceList
          favorites={userData.favorites}
          deleteFavorite={deleteFavorite}
        />
      </Box>
    </div>
  );
}
