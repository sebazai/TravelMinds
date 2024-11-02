import { Box, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as MuiIcons from '@mui/icons-material';

const useStyles = makeStyles({
  chip: {
    backgroundColor: '#fff',
    color: '#000',
    opacity: 1,
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    margin: '0 4px',
    padding: '0 8px',
    height: '32px',
    fontWeight: 500,
    fontSize: '0.875rem',
    '& .MuiChip-icon': {
      marginLeft: '4px',
      color: '#000',
    },
  },
  container: {
    position: 'fixed',
    bottom: '55px', // Position 60px above the bottom
    left: 0,
    right: 0,
    zIndex: 450,
    display: 'flex',
    overflowX: 'auto', // Enable horizontal scroll
    whiteSpace: 'nowrap', // Prevent line breaks
    padding: '8px 0',
    '&::-webkit-scrollbar': {height: '6px'},
    '&::-webkit-scrollbar-thumb': {backgroundColor: '#888', borderRadius: '10px'},
    '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#555'},
  }
});

export const SelectionOverlay = (props) => {
  const {chips, location, chat} = props;
  const classes = useStyles()
  const onClick = (chip) => {
    chat({messages: [{role: "user", content: chip.description}], location});
  }
  const chipsComponents = chips.map((chip, index) => {
    const IconComponent = MuiIcons[chip.icon];
    return (<Chip
      icon={IconComponent ? <IconComponent color={"#000"}/> : null}
      onClick={() => onClick(chip)}
      key={index}
      className={classes.chip}
      label={chip.title}
      clickable
    />)
  });


  return (
    <Box className={classes.container}>
      {chipsComponents}
    </Box>
  );
}