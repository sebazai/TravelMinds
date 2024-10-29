import React from 'react';
import PlaceCard from "./PlaceCard";
import { Box } from '@mui/material';

const PlaceList = ({ places }) => {
    return (
      <Box
        sx={{
          height: '82vh',       
          overflowY: 'auto',     
          padding: 2             
        }}
      >
        {places.map((place, index) => (
          <PlaceCard
            key={index}
            title={place.title}
            description={place.description}
            image={place.image}
            rate={place.rate}
          />
        ))}
      </Box>
    )
};

export default PlaceList;
