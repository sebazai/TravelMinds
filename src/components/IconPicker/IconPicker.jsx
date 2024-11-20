// components/IconPicker.js
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import {
  FaHotel,          // Hotel - Accommodation
  FaUmbrellaBeach,  // Beach - Coastal Locations
  FaMountain,       // Mountain - Hiking/Trekking
  FaMapMarkedAlt,   // Map Marker - Tourist Spot
  FaCity,           // City - Urban Locations
  FaLandmark,       // Landmark - Monuments
  FaUtensils,       // Utensils - Restaurants
  FaCoffee,         // Coffee - Cafes
  FaShoppingBag,    // Shopping Bag - Malls/Shops
  FaTheaterMasks,   // Theater Masks - Entertainment/Shows
  FaSpa,            // Spa - Wellness Centers
  FaTree,           // Tree - Parks/Outdoor
  FaCamera,         // Camera - Photography Spots
  FaWater,          // Water - Water Activities
  FaPalette,        // Palette - Art and Museums
  FaMusic,          // Music - Concerts and Festivals
  FaWineGlassAlt,   // Wine Glass - Bars or Wineries
  FaBook,           // Book - Libraries or Cultural Centers
  FaGamepad,        // Gamepad - Entertainment or Gaming
  FaDice,           // Dice - Casinos or Games
} from 'react-icons/fa';

export const selectedIcons = {
  FaHotel,          // Hotel - Accommodation
  FaUmbrellaBeach,  // Beach - Coastal Locations
  FaMountain,       // Mountain - Hiking/Trekking
  FaMapMarkedAlt,   // Map Marker - Tourist Spot
  FaCity,           // City - Urban Locations
  FaLandmark,       // Landmark - Monuments
  FaUtensils,       // Utensils - Restaurants
  FaCoffee,         // Coffee - Cafes
  FaShoppingBag,    // Shopping Bag - Malls/Shops
  FaTheaterMasks,   // Theater Masks - Entertainment/Shows
  FaSpa,            // Spa - Wellness Centers
  FaTree,           // Tree - Parks/Outdoor
  FaCamera,         // Camera - Photography Spots
  FaWater,          // Water - Water Activities
  FaPalette,        // Palette - Art and Museums
  FaMusic,          // Music - Concerts and Festivals
  FaWineGlassAlt,   // Wine Glass - Bars or Wineries
  FaBook,           // Book - Libraries or Cultural Centers
  FaGamepad,        // Gamepad - Entertainment or Gaming
  FaDice,           // Dice - Casinos or Games
};

export const IconPicker = ({ onChange, currentIcon }) => {
  const iconOptions = Object.keys(selectedIcons).map((iconName) => ({
    label: iconName.slice(2),
    value: iconName,
    icon: selectedIcons[iconName],
  }));

  return (
    <Autocomplete
      id="icon-select-demo"
      sx={{ width: '100%' }}
      options={iconOptions}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      autoHighlight
      value={iconOptions.find((option) => option.value === currentIcon) || null}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const IconComponent = option.icon;
        const { key, ...otherProps } = props;
        return (
          <Box
            component="li"
            sx={{
              '& > svg': { mr: 2, flexShrink: 0 },
              display: 'flex',
              alignItems: 'center',
            }}
            key={key}
            {...otherProps}
          >
            <IconComponent />
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => {
        const SelectedIcon = currentIcon ? selectedIcons[currentIcon] : null;
        return (
          <TextField
            {...params}
            variant="outlined"
            label="Icon"
            placeholder="Select an Icon"
            InputLabelProps={{
              style: {
                fontSize: '26px',  
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  {SelectedIcon && (
                    <InputAdornment position="start">
                      <SelectedIcon />
                    </InputAdornment>
                  )}
                  {params.InputProps.startAdornment}
                </>
              ),
              
            }}
           
          />
        );
        
      }}
      onChange={(event, newValue) => {
        onChange(newValue ? newValue.value : '');
      }}
      ListboxProps={{
        style: {
          maxHeight: '300px',
        },
      }}
    />
  );
};
