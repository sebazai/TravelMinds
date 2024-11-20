'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import Banner from '@/components/global/Banner'
import { IconPicker } from '@/components/IconPicker/IconPicker';
import { useGetUserQuery } from '@/store/services/userApi.js';

export default function FormPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'home',
  });
  const {data: userData, refetch} = useGetUserQuery();
  useEffect(() => {
    const description = searchParams.get('description');
    if (description) {
      setFormData((prev) => ({
        ...prev,
        description: description,
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        createdBy: userData._id,
      }),
    }).then(()=>refetch());


    setFormData({
      title: '',
      description: '',
      icon: 'home',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (iconName) => {
    setFormData((prev) => ({
      ...prev,
      icon: iconName,
    }));
  };

  return (userData && (
    <Container 
    maxWidth="sm" 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh',
      pt: 4, 
      backgroundColor: "background.main"
    }}
  >       
      <Banner title="NEW PREFERENCE " />     
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            backgroundColor: 'lightGrey.main'
          }}
        >
        <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
          sx={{
            '& .MuiFormLabel-asterisk': {
              color: 'orange.main',
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
            },
            '& .MuiInputLabel-root': {
              fontSize: '1.2rem', 
            },
            mb: 3,
          }}
        />


          <Box sx={{ my: 2 }}>
            <IconPicker
              currentIcon={formData.icon}
              onChange={handleIconChange}
            />
          </Box>

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}

          sx={{
            '& .MuiFormLabel-asterisk': {
              color: 'orange.main',
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
            },
            '& .MuiInputLabel-root': {
              fontSize: '1.2rem', 
            },
            mb: 3, 
            mt: 3, 
          }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
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
              mt: 3, 
            }}
          >
            Add new Preference
          </Button>
        </form>
        </Paper>
      </Box>
    </Container>
  )
  );
}
