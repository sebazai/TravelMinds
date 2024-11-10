import React from 'react';
import PlaceCard from './PlaceCard';
import { Box } from '@mui/material';

const PlaceList = ({ favorites }) => {
  return (
    <Box
      sx={{
        height: '82vh',
        overflowY: 'auto',
        padding: 2,
      }}
    >
      {favorites.map((favorite, index) => (
        <PlaceCard
          key={index}
          title={favorite.title}
          description={favorite.description}
          image={favorite.photo}
          rate={favorite.rating}
        />
      ))}
    </Box>
  );
};

export default PlaceList;
