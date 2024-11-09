import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import IconDisplay from '../IconPicker/IconDisplay';

const PreferenceCard = ({ title, description, icon }) => {

  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor: 'darkGrey.main',
        borderRadius: '10px',
        marginBottom: 2,
        border: `1px solid ${(theme) => theme.palette.border.main}`,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component={'div' }
        alt={title}
       
        sx={{
          width: '48px',
          height: '48px',
          margin: 2,
          filter: 'brightness(0) invert(1)',
          '& svg': {
            fontSize: '48px',
          },
        }}
      >
        {IconDisplay({ iconName: icon })}
      </CardMedia>
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
            color: 'text.secondary',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            marginTop: 0.5,
            fontWeight: 'medium',
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PreferenceCard;
