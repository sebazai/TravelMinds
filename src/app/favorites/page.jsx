import PlaceList from "@/components/favorites/PlaceList"; 
import placesData from './favorites.json';
import FavoritesBanner from "@/components/favorites/Favoritebanner";
import { Box } from '@mui/material';



export default function Page() {
  return (
    <div>
      <FavoritesBanner />
      <Box sx={{ marginTop: '70px', paddingX: 2 }}>
        <PlaceList places={placesData.places} />
     </Box>
    </div>
  )
}