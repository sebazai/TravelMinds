import React from 'react';
import Image from 'next/image';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const UserCard = ({ user, locality, country}) => {
  return (
    <Card
      sx={{
        width: '96%',  
        display: 'flex',
        boxShadow: 3,
        bgcolor: 'lightGrey.main',
        padding: 2
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', }}> 
        <Grid container spacing={5}> 
          
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
              src='https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ width: 100, height: 100, borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                mb: 1,  
              }}
            >
              Welcome {user.firstName} {user.lastName}
            </Typography>

            <Box display="flex" alignItems="center" mb={1}>
              {user.countryCode && (
                <Image
                  src={`https://flagcdn.com/w320/${user.countryCode.toLowerCase()}.png`}
                  alt={user.countryOfOrigin}
                  sx={{ marginRight: 2 }} 
                  width={20}
                  height={15}
                />
              )}
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', color: 'orange.main' }}
              >
                {user.countryOfOrigin}
              </Typography>
            </Box>
            {locality && country && (
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              Actually in {locality}, {country}
            </Typography>
            )}
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
