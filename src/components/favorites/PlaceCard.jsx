import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  Rating,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PlaceCard = ({ title, description, image, rate }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: 1.5,
        width: '100%',
        maxWidth: 580,
        position: 'relative',
        marginX: 'auto', 
      }}
    >
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          color: 'grey.700',
        }}
      >
        <CloseIcon />
      </IconButton>

      <CardMedia
        component="img"
        sx={{ width: '35%' }} 
        image={image}
        alt={title}
      />

      <CardContent
        sx={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingX: 1.5, 
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography
            variant="subtitle1" 
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            {title}
          </Typography>
        </Grid>

        <Grid container sx={{ marginY: 0.5 }}>
          <Rating
            name="place-rating"
            value={Number(rate)}
            precision={0.1}
            readOnly
            sx={{ color: 'orange.main' }}
          />
        </Grid>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
