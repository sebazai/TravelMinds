import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Banner = ({ title }) => {
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
      <Toolbar
        sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="h4" component="div" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Banner;
