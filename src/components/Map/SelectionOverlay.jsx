import { Box, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { selectedIcons } from '@/components/IconPicker/IconPicker.jsx';

const useStyles = makeStyles({
  chip: {
    backgroundColor: '#7B6DBB',
    color: '#fff',
    opacity: 1,
    borderRadius: '8px',
    border: '1px solid #7B6DDD',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    margin: '0 4px',
    padding: '0 8px',
    height: '32px',
    fontWeight: 500,
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#7B6DDD',
    },
    '& .MuiChip-icon': {
      marginLeft: '4px',
      color: '#fff',
    },
  },
  container: {
    position: 'fixed',
    bottom: '65px', // Position 60px above the bottom
    left: 0,
    right: 0,
    zIndex: 450,
    display: 'flex',
    overflowX: 'auto', // Enable horizontal scroll
    whiteSpace: 'nowrap', // Prevent line breaks
    padding: '8px 0',
    '&::-webkit-scrollbar': { height: '6px' },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#333',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
  },
});

export const SelectionOverlay = (props) => {
  const { chips, onFetchPlaces } = props;
  const classes = useStyles();
  const onClick = (chip) => {
    onFetchPlaces({
      prompt: chip.description,
    });
  };
  const chipsComponents = chips.map((chip, index) => {
    const IconComponent = selectedIcons[chip.icon];
    return (
      <Chip
        icon={IconComponent ? <IconComponent  color={'white'} /> : null}
        onClick={() => onClick(chip)}
        key={index}
        className={classes.chip}
        label={chip.title}
        clickable
      />
    );
  });

  return <Box className={classes.container}>{chipsComponents}</Box>;
};
