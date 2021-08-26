//Require dotenv module to process environment variables in .env file:
require('dotenv').config()
//Connect twilio library
const client = require('../lib/twilio')
//SET a recepient phone-number:
const recPhoneNumber = process.env.TARGET_NUMBER;
//SET twilio phone-number:
const twilioNumber = process.env.TWILIO_NUMBER;

const sendText = function(text) {

return client.messages
  .create({
    body: `${text}`,
    to: recPhoneNumber,
    from: twilioNumber
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.log(error.message))

}
exports.sendText = sendText
