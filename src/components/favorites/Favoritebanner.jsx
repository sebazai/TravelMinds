import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const FavoritesBanner = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'text.secondary', 
        zIndex: 1201,
        height: '8vh',    
        width: '100%',       
      }}
    >
      <Toolbar sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" component="div" sx={{ color: 'text.primary' }}>
          MY FAVORITES
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default FavoritesBanner;
