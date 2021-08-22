//Require dotenv module to process environment variables in .env file:
require('dotenv').config()
//Connect twilio module
const twilio = require('twilio');
//Set accountSID using .env file:
const accountSid = process.env.TWILIO_ACCOUNT_SID;
//Set a token using .env file:
const authToken = process.env.TWILIO_AUTH_TOKEN;
//SET a recepient phone-number:
const recPhoneNumber = process.env.TARGET_NUMBER;
//SET twilio phone-number:
const twilioNumber = process.env.TWILIO_NUMBER;
//Creating an instance of twilio class
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from Node',
    to: recPhoneNumber,
    from: twilioNumber
  })
  .then((message) => console.log(message.sid))
