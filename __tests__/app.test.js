const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const CryService = require('../lib/services/CryServices.js');

const currentDate = new Date().toISOString().slice(0, 10);

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POSTS a new cry', async () => {
    const cry = {
      name: 'DJ',
      cry: false,
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
  
  it('GETS all entries', async () => {
    const cry1 = await CryService.createEntry({
      name: 'DJ',
      cry: false,
    });
    
    const cry2 = await CryService.createEntry({
      name: 'Anonymous',
      cry: true,
    });
    
    const res = await request(app).get('/api/v1/alchemy-cry-lab');
    
    expect(res.body).toEqual([cry1, cry2]);
  });
  

  it('GETS all crys', async () => {
    const cry1 = await CryService.createEntry({
      name: 'DJ',
      cry: false,
    });

    const cry2 = await CryService.createEntry({
      name: 'Anonymous',
      cry: true,
    });

    const res = await request(app).get('/api/v1/alchemy-cry-lab/crys');

    expect(res.body).toEqual([cry2]);
    expect(res.body).not.toContain(cry1);
  });


  it('GETS an entry by its id', async () => {
    const cry = await CryService.createEntry({
      name: 'DJ',
      cry: false,
    });
    const res = await request(app).get(`/api/v1/alchemy-cry-lab/entry/${cry.id}`);

    expect(res.body).toEqual(cry);
  });


  it('GETS all entries from today', async () => {
    const cry1 = await CryService.createEntry({
      name: 'DJ',
      cry: false,
    });


    const cry2 = await CryService.createEntry({
      name: 'Anonymous',
      cry: true,
    });

    const res = await request(app).get(`/api/v1/alchemy-cry-lab/${currentDate}`);

    expect(res.body).toEqual([cry1, cry2]);
  });


  it('GETS all crys from today', async () => {
    const cry1 = await CryService.createEntry({
      name: 'DJ',
      cry: false,
    });

    const cry2 = await CryService.createEntry({
      name: 'Anonymous',
      cry: true,
    });

    const res = await request(app).get(`/api/v1/alchemy-cry-lab/crys/${currentDate}`);

    expect(res.body).toEqual([cry2]);
    expect(res.body).not.toContain(cry1);
  });
  

  it('updates a cry status by id', async () => {
    const entry = await CryService.createEntry({
      name: 'DJ',
      cry: false,
    });

    const updatedEntry = {
      id: entry.id,
      name: 'DJ',
      cry: true,
      date: entry.date
    };

    const res = await request(app)
      .put(`/api/v1/alchemy-cry-lab/update/${entry.id}`);

    expect(res.body).toEqual(updatedEntry);
  });

  it('deletes an entry by id', async () => {
    const entry = await CryService.createEntry({
      name: 'DJ',
      cry: false,
    });

    const res = await request(app).delete(`/api/v1/alchemy-cry-lab/delete/${entry.id}`);

    expect(res.body).toEqual({ 'message': 'Entry 1 was deleted.' });
  });

});
