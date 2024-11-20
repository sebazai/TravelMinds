import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UserIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const routes = ['/favorites', '/map', '/settings'];

export const NavBar = () => {
  const [value, setValue] = useState(1);
  const router = useRouter();
  return (
    <div style={{ marginTop: 'auto', width: '100vw' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          routes;
          router.push(routes[newValue]);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction  icon={<FavoriteIcon />} />
        <BottomNavigationAction  icon={<LocationOnIcon />} />
        <BottomNavigationAction  icon={<UserIcon />} />
      </BottomNavigation>
    </div>
  );
};
