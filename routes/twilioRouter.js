//Require dotenv module to process environment variables in .env file:
require('dotenv').config()
//Connect twilio library
const client = require('../lib/twilio')
//SET a recepient phone-number:
const recPhoneNumber = process.env.TARGET_NUMBER;
//SET twilio phone-number:
const twilioNumber = process.env.TWILIO_NUMBER;


client.messages
  .create({
    body: 'Hello from Node 2',
    to: recPhoneNumber,
    from: twilioNumber
  })
  .then((message) => console.log(message.sid))
