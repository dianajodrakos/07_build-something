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
    const { name, cry, date } = await Cry.getById(id);
    const newCry = !cry;
    const outcome = newCry ? 'cried' : 'didn\'t cry';

    await sendSms(
      process.env.CLIENT_NUMBER,
      `The truth is, on ${date}, ${name} actually ${outcome}.`
    );

    const entry = await Cry.update(name, newCry, date, id);

    return entry;
  }
};
