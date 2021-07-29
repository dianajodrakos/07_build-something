import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POSTS a new cry', async () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const cry = {
      name: 'DJ',
      cry: true,
      date: currentDate
    };

    const res = await request(app)
      .post('/api/v1/alchemy-cry-lab')
      .send(cry);
    console.log(res);
    expect(res.body).toEqual({
      id: '1',
      date: '07-28-2021',
      ...cry,
    });
  });
});
