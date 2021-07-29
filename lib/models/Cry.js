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


static async getAllCrys() {
    const { rows } = await pool.query
    ('SELECT * FROM crys WHERE cry=$1', [true]);
    return rows.map((row) => new Cry(row));
    }

static async getById(id) {
    const { rows } = await pool.query
    ('SELECT * FROM crys WHERE id=$1', [id]);
    return new Cry(rows[0]);
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


static async updateEntry(id) {
  const { name, cry, date } = await Cry.getById(id);
  const newCry = !cry;

  const { rows } = await pool.query(
    'UPDATE crys SET name=$1, cry=$2, date=$3 WHERE id=$4 RETURNING *', [name, newCry, date, id]);

  return new Cry(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM crys WHERE id=$1 RETURNING *',
      [id]
  );

  return new Cry(rows[0]);
  }
}