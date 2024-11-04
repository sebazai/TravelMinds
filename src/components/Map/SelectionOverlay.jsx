import {Box, Chip} from "@mui/material";

export const SelectionOverlay = (props)=>{
  const {chips, location, chat} = props;
  const onClick = (chip) => {
    chat({ messages:  [{ role: "user", content: chip }], location });
  }
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '55px', // Position 60px above the bottom
        left: 0,
        right: 0,
        zIndex: 450,
        display: 'flex',
        overflowX: 'auto', // Enable horizontal scroll
        whiteSpace: 'nowrap', // Prevent line breaks
        padding: '8px 0', // Optional padding
        '&::-webkit-scrollbar': { height: '6px' }, // Optional scrollbar styling
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
      }}
    >
      {chips.map((chip, index) => (
        <Chip
          onClick={()=>onClick(chip)}
          key={index}
          label={chip}
          sx={{
            background: '#CCC',
            color: '#000',
            opacity: 1,
            margin: '0 4px',
          }}
          clickable
        />
      ))}
    </Box>
  );
}