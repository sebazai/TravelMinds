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

const UserCard = ({ user }) => {
  return (
    <Card
      sx={{
        width: '90%',
        p: 2,
        display: 'flex',
        boxShadow: 3,
        bgcolor: 'lightGrey.main',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Welcome {user.firstName} {user.lastName}
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={2}>
            <Avatar
              src={user.photo}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ width: 50, height: 50, borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={10}>
            <Box display="flex" alignItems="center" mb={1}>
              {user.countryCode && (
                <Image
                  src={`https://flagcdn.com/w320/${user.countryCode.toLowerCase()}.png`}
                  alt={user.countryOfOrigin}
                  style={{ marginRight: '8px' }}
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
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'text.primary',
              }}
            >
              Actually in {user.currentLocation.city} ...
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
