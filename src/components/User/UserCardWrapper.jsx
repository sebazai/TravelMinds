import UserCard from './UserCard';
import { Box } from '@mui/material';

const UserCardWrapper = ({ user, locality, country }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UserCard user={user} locality={locality} country={country} />
    </Box>
  );
};

export default UserCardWrapper;
