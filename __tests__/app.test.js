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
    const cry = {
      name: 'DJ',
      cry: true,
    };

    const res = await (await request(app).post('api/v1/alchemy-cry-lab')).send(cry);

    expect(res.body).toEqual({
      id: '1',
      date: '07-28-2021'
      ...cry,
    });
  });
});
