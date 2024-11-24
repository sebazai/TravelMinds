# TravelMinds

A Computer Science Project for the University of Helsinki CSM11006 course.

[Travelminds Documentary](https://github.com/sebazai/TravelMinds/blob/main/Travelminds_personalized_travel_planning_application.pdf)

## Trello board

[The board](https://trello.com/b/H7lGfMBt/holidayapp)

[Invite link](https://trello.com/invite/b/6704d864b6d1533ee326eee9/ATTI551e8b197eec5564a7c984d9ce7308ea77FE683B/holidayapp)

## Setup project

Create a `.env.local` file in the root (same place as package.json)

Add the connection string to `.env.local`, replace <ask for connection string> with the connection string.

```
MONGODB_URI="<ask for connection string>"
GOOGLE_API_URL="<ask>"
GROQ_API_URL="<ask>"
```

### Optional

If you use nvmrc that is recommended, run `nvm use` to get the correct Node version.

### Run

`npm ci` - to install dependencies

`npm run dev` - to start the development server

Upon successful connection to MongoDB, the application will be accessible at url `localhost:3000`

## Seeding the Database

To seed the database with a sample user and preferences, run the following command:

`npm run seed`

This script will:

    Connect to the MongoDB database specified in your .env.local file.
    Clear the existing users in the database.
    Add a sample user with predefined preferences.

**Notes:**

- Ensure that your `.env.local` file contains the `MONGODB_URI` pointing to your MongoDB instance.
- The path to the `User` model in the `seed.js` script (`./src/models/User.js`) should be adjusted based on your project's directory structure.
- Before running the seed script, make sure all dependencies are installed by executing `npm install`.

By following these steps, you'll set up a seed script that initializes your MongoDB database with a sample user and preferences, facilitating development and testing.
