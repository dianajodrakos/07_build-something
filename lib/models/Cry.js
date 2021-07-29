import pool from '../utils/pool.js';
import date from '../utils/date.js';

export default class Cry {
  id;
  name;
  cry;
  date;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cry = row.cry;
    this.date = row.date;
  }

  static async create({ name, cry, date }) {
    const newDate = date;
    const { rows } = await pool.query(
      'INSERT INTO crys (name, cry, date) VALUES ($1, $2, $3) RETURNING *'
      [name, cry, newDate]
    );

    return new Cry(rows[0]);
  }
}