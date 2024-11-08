"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Chip, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export const SearchBar = (props) => {
  const { chat, location } = props;
  // const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // chat({ messages: [{ role: "user", content: searchTerm }], location });
      setIsSearching(true);
    }
  };

  const handleAddPage = () => {
    // router.push(`/search?q=${searchTerm}`);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '55px', 
        left: 0,
        right: 0,
        zIndex: 450,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
      }}
    >
      <InputBase
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsSearching(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        sx={{
          flex: 1,
          padding: "8px 16px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          color: "#000",
          "&::placeholder": {
            color: "#888",
          },
          backgroundColor: "#fff",
          transition: "all 0.2s",
        }}
        startAdornment={
          <IconButton
            size="small"
            onClick={handleSearch}
            sx={{ marginRight: "8px" }}
          >
            <SearchIcon sx={{ color: "#000" }} />
          </IconButton>
        }
      />
      {isSearching && (
        <IconButton onClick={handleAddPage}
        sx={{ color: "#000",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "20px",
          marginLeft: "8px",
        transition: "all 0.2s",
         }} >
          <AddIcon />
        </IconButton>
      )}
    </Box>
  );
};

