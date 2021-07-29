import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cry from '../lib/models/Cry.js';

const currentDate = new Date().toISOString().slice(0, 10);

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
      date: currentDate,
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

  it('GETS all entries from today', async () => {
    const cry1 = await Cry.create({
      name: 'DJ',
      cry: false,
    });

    const cry2 = await Cry.create({
      name: 'Anonymous',
      cry: true,
    });

    const res = await request(app).get(`/api/v1/alchemy-cry-lab/${currentDate}`);

    expect(res.body).toEqual([cry1, cry2]);
  });

  it('GETS all crys from today', async () => {
    const cry1 = await Cry.create({
      name: 'DJ',
      cry: false,
    });

    const cry2 = await Cry.create({
      name: 'Anonymous',
      cry: true,
    });

    const res = await request(app).get(`/api/v1/alchemy-cry-lab/${currentDate}/crys`);

    expect(res.body).toEqual([cry2]);
    expect(res.body).not.toContain(cry1);
  });

});
