'use client';

import { useState } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

export const SearchBar = (props) => {
  const { onFetchPlaces } = props;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onFetchPlaces({
        prompt: searchTerm,
      });
      setIsSearching(true);
    }
  };

  const handleAddPage = () => {
    router.push(`/new_preference?description=${searchTerm}`);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '12px',
        left: 0,
        right: 0,
        zIndex: 450,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
      }}
    >
      <InputBase
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsSearching(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        sx={{
          flex: 1,
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          color: 'text.primary',
          '&::placeholder': {
            color: '#888',
          },
          backgroundColor: 'lightGrey.main',
          transition: 'all 0.2s',
        }}
        startAdornment={
          <IconButton
            size="small"
            onClick={handleSearch}
            sx={{ marginRight: '8px' }}
          >
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </IconButton>
        }
      />
      {isSearching && (
        <IconButton
          onClick={handleAddPage}
          sx={{
            color: 'text.secondary',
            backgroundColor: 'lightGrey.main',
            border: '1px solid #ccc',
            borderRadius: '20px',
            marginLeft: '8px',
            transition: 'all 0.2s',
            //ADD HOVER EFFECT
            '&:hover': {
              backgroundColor: 'text.secondary',
              color: 'text.primary',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      )}
    </Box>
  );
};
