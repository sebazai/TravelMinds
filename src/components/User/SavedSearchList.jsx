// src/components/User/SavedSearchList.jsx
import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import PreferenceCard from './PreferencesCard';

const SavedSearchList = ({ savedSearches }) => {
  if (!Array.isArray(savedSearches)) {
    return (
      <Typography variant="body1">
        Any preferences for now... Add one here
      </Typography>
    );
  }
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'text.secondary',
          color: 'text.primary',
          width: '100%',
          height: '8vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h5">Saved searches</Typography>
      </Box>

      <Box
        sx={{
          maxHeight: '46vh',
          overflowY: 'auto',
          margin: 2,
        }}
      >
        <Container>
          {savedSearches.map((search, index) => (
            <PreferenceCard
              key={index}
              title={search.title}
              description={search.description}
              icon={search.icon}
            />
          ))}
        </Container>
      </Box>
    </>
  );
};

export default SavedSearchList;
