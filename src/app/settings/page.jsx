import userData from './settingsInfo.json';
import UserCardWrapper from '@/components/User/UserCardWrapper';
import SavedSearchList from '@/components/User/SavedSearchList';
import AddNewPreferenceButton from '@/components/User/PreferenceButton';
import { Box } from '@mui/material'; 

export default function Page() {
  return (
    <Box
      sx={{
        bgcolor: 'background.main',
        padding: 1, 
      }}
    >
      <UserCardWrapper user={userData.user} />
      <br/>
      <SavedSearchList savedSearches={userData.user.savedSearches} />
      <AddNewPreferenceButton/>
    </Box>
  );
}
