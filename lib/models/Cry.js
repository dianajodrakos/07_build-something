import pool from '../utils/pool.js';

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

  static async create({ name, cry }) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const { rows } = await pool.query(
      'INSERT INTO crys (name, cry, date) VALUES ($1, $2, $3) RETURNING *',
      [name, cry, currentDate]
      );

    return new Cry(rows[0]);
  }

static async getAll() {
    const { rows } = await pool.query
    ('SELECT * FROM crys');
    return rows.map((row) => new Cry(row));
    }

static async getEntriesByDate(date) {
    const { rows } = await pool.query
    ('SELECT * FROM crys WHERE date=$1', [date]);
    return rows.map((row) => new Cry(row));
    }

static async getCrysByDate(date) {
    const { rows } = await pool.query
    ('SELECT * FROM crys WHERE date=$1 AND cry=$2', [date, true]);
    return rows.map((row) => new Cry(row));
    }
}
