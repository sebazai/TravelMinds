'use client';
import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const AddNewPreferenceButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/new_preference');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
      }}
    >
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: 'text.secondary',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: 'bold',
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            bgcolor: 'green.main',
            boxShadow: 6,
          },
        }}
      >
        <AddIcon sx={{ marginRight: 1 }} />
        <Typography variant="button">Add New Preference</Typography>
      </Button>
    </Box>
  );
};

export default AddNewPreferenceButton;
