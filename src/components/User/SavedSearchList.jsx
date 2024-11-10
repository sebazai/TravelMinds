// src/components/User/SavedSearchList.jsx
import React from 'react';
import { Typography, Container } from '@mui/material';
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
      <br />
      <h2>My favorites researchs :</h2>
      <br />
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
    </>
  );
};

export default SavedSearchList;
