import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import {useState} from "react";
import {useRouter} from "next/navigation";
const routes = ['/favorites', '/map', '/settings']

export const NavBar = ( ) => {
  const [value, setValue] = useState(1);
  const router = useRouter();
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

    <BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {routes
      router.push(routes[newValue]);
      setValue(newValue);
    }}
  >
    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
    <BottomNavigationAction label="POIs" icon={<LocationOnIcon />} />
    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
  </BottomNavigation>
    </Paper>

      )
}