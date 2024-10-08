# TravelMinds

A Computer Science Project for the University of Helsinki CSM11006 course.

## Trello board

[The board](https://trello.com/b/H7lGfMBt/holidayapp)

[Invite link](https://trello.com/invite/b/6704d864b6d1533ee326eee9/ATTI551e8b197eec5564a7c984d9ce7308ea77FE683B/holidayapp)

## Setup project

Create a `.env.local` file in the root (same place as package.json)

Add the connection string to `.env.local`, replace <ask for connection string> with the connection string.

```
MONGODB_URI="<ask for connection string>"
```

Optional:

If you use nvmrc that is recommended, run `nvm use` to get the correct Node version.

Then run:

`npm ci` - to install dependencies

`npm run dev`

You should see:
`Pinged your deployment. You successfully connected to MongoDB!` once you are connected to DB succesfully.

Url is `localhost:3000`
