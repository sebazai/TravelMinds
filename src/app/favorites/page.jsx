'use client';
import PlaceList from '@/components/favorites/PlaceList';
import { CircularProgress, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoritesBanner from '@/components/favorites/Favoritebanner';

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
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

  if (error) {
    return <Box>Error: {error}</Box>;
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
