const express = require("express");
const dotenv = require("dotenv");
const { google } = require('googleapis');
const uuid = require("uuid")

/** To load the environment variables */
dotenv.config();

/** Initializing ezpress app */
const app = express();

/** Getting port from EVN else initializing it to 8000 by default */
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

/** Initializing the Google OAuth Client */
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

/** auth endpoint where the auth url will be generated */
app.get('/auth', (req, res) => {
  /** Creating the oauth URL */
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  res.redirect(url);
});

/** The callback URL where the auth endpoint will process will be redirect to */
app.get("/auth/redirect", async (req, res) => {

  /** Fetching the token from the getToken method porvided by the oauth2Client */
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  res.send('Authentication successful! Please return to the console.');
});

/** Initialzing calendar instance */
const calendar = google.calendar({
  version: 'v3',
  auth: oauth2Client
});

/** Event data */
const event = {
  summary: 'Tech Talk with prashant',
  location: 'Google Meet',

  description: "Demo event for prashant's Blog Post.",
  start: {
    dateTime: "2024-08-15T19:30:00+05:30",
    timeZone: 'Asia/Kolkata'
  },
  end: {
    dateTime: "2024-08-15T20:30:00+05:30",
    timeZone: 'Asia/Kolkata'
  },
  colorId: 1,
  conferenceData: {
    createRequest: {
      requestId: uuid.v4()
    }
  },
  attendees: [
    { email: 'attendes@gmail.com' },
  ]
};

/** Endpoint to create the event */
app.get('/create-event', async (req, res) => {
  try {
    const result = await calendar.events.insert({
      calendarId: 'primary',
      auth: oauth2Client,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      resource: event
    });

    res.send({
      status: 200,
      message: 'Event created',
      link: result.data.hangoutLink
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
