const Cry = require('../models/Cry');
const { sendSms } = require('../utils/twilio');

module.exports = class CryService {

  static async createEntry({ name, cry }) {
    const outcome = cry ? 'cried' : 'didn\'t cry';

    await sendSms(
      process.env.CLIENT_NUMBER,
      `${name} ${outcome} today.`
    );

    const entry = await Cry.create(name, cry);
    return entry;
  }

  static async updateEntry(id) {
    await sendSms(
      process.env.CLIENT_NUMBER,
      `hi mom`
    );

    const entry = await Cry.update(id);

    return entry;
  }
};
