"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import { IconPicker } from "@/components/IconPicker/IconPicker";
import { icon } from "leaflet";

export default function FormPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "home",
  });

  useEffect(() => {
    const description = searchParams.get("description");
    if (description) {
      setFormData((prev) => ({
        ...prev,
        description: description,
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // todo: send form data to the server
    console.log("Formulaire soumis:", formData);
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

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Preference
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
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
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
