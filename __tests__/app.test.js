import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cry from './models/Cry.js';

describe('routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POSTS a new cry', async () => {
    const cry = {
      name: 'DJ',
      cry: true,
    };

    const res = await request(app)
      .post('/api/v1/alchemy-cry-lab')
      .send(cry);

    expect(res.body).toEqual({
      id: '1',
      ...cry,
    });
  });

  it('GETS all crys', async () => {
    const cry1 = await Cry.create({
      name: 'DJ',
      cry: false,
    });

    const cry2 = await Cry.create({
      name: 'Anonymous',
      cry: true,
    });

    const res = await request(app).get('/api/v1/alchemy-cry-lab');

    expect(res.body).toEqual([cry1, cry2]);
  });

});
