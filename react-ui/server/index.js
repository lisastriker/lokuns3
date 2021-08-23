const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken);
const express = require('express'); 
const cors = require('cors');
const app = express()
const path = require('path')

const port = process.env.PORT || 4000
app.use(cors())
const publicPath = path.join(__dirname, '..', 'public');
  app.use(express.static(publicPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  })


app.get('/send-text', (req, res) => {
  const { textMessage, recipient } = req.query
  client.messages
  .create({
   body: textMessage,
   from: '+14155211196',
   to: '+6586121207'
  })
  .then(message => console.log(message.sid));
  res("Sent")
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:`, port)
})