import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cry from '../lib/models/Cry.js';

describe('routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POSTS a new cry', async () => {

  });
});
