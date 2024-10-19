import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const PreferenceCard = ({ title, description, icon }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor: 'background.main', 
        borderRadius: '10px',
        marginBottom: 2,
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        image={icon}
        sx={{
          width: '48px',
          height: '48px',
          margin: 2,
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'darkBlue.main', 
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'orange.default', 
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PreferenceCard;
