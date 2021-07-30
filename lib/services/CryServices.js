const Cry = require('../models/Cry');
const { sendSms } = require('../utils/twilio');

module.exports = class CryService {

  static async createEntry({ name, cry }) {
    const message = cry 
      ? `${name} cried today.`
      : `${name} didn't cry today.`;
    
    await sendSms(
      process.env.CLIENT_NUMBER,
      message
    );

    const entry = await Cry.create(name, cry);
    return entry;
  }

  static async updateEntry(id) {
    const { name, cry, date } = await Cry.getById(id);
    
    const newCry = !cry;
    const message = newCry 
      ? `The truth is, on ${date}, ${name} actually did cry, and that's ok.` 
      : `Sounds like on ${date}, ${name} didn't cry. There's always tomorrow.`;

    await sendSms(
      process.env.CLIENT_NUMBER,
      message
    );

    const entry = await Cry.update(name, newCry, date, id);

    return entry;
  }

  static async deleteEntry(id) {
    await sendSms(
      process.env.CLIENT_NUMBER,
      `Entry ${id} was deleted.`
    );

    const entry = await Cry.deleteById(id);
    return entry;
  }
};
