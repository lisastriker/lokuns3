const express = require('express');
const path = require('path');
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const PORT = process.env.PORT || 8000;
require('dotenv').config()
const client = require('twilio')(accountSid, authToken);
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.get('/send-text', (req, res) => {
    const { textMessage, recipient } = req.query
    client.messages
    .create({
     body: textMessage,
     from: '+14155211196',
     to: '+6586121207'
    })
    .then(message => console.log(message.sid));
    res.send("Sucess")
  })

  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
  
  
	
  app.listen(PORT, function () {
    console.error(`Listening on port ${PORT}`);
  });

	