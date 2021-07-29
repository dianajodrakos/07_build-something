const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const bindingOpts = {
  identity: '00000001', 
  bindingType: 'sms',
  address: '+19712631678',
};

client.notify
  .services(process.env.TWILIO_ACCOUNT_SID)
  .bindings.create(bindingOpts)
  .then(binding => console.log(binding.sid))
  .catch(error => console.log(error))
  .done();
