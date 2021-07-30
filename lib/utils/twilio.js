const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// //from twilio quick start guide
// const notificationOpts = {
//   toBinding: JSON.stringify({
//     binding_type: 'sms',
//     address: '+19712631678',
//   }),
//   body: 'Knock-Knock! This is your first Notify SMS',
// };

// client.notify
//   .services(process.env.TWILIO_SERVICES_SID)
//   .notifications.create(notificationOpts)
//   .then(notification => console.log(notification.sid))
//   .catch(error => console.log(error));


//from separation of concerns lab
const sendSms = (to, message) => {
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to: process.env.CLIENT_NUMBER,
  });
};

module.exports = { sendSms };
