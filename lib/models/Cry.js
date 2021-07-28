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

  
}