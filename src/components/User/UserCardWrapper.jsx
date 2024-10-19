import UserCard from "./UserCard";
import { Box } from '@mui/material'; 


const UserCardWrapper = ({ user }) => {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
        }}
      >
        <UserCard user={user} />
      </Box>
    );
  };
  
  export default UserCardWrapper;