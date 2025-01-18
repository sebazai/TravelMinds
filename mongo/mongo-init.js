db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'travelminds',
    },
  ],
});

// To seed the database
// docker exec -it travelminds-dev bash
// npm run seed
