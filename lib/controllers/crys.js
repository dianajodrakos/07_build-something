import { Router } from 'express';
import Cry from '../models/Cry.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const entry = await Cry.create(req.body);
      res.send(entry);
    } catch (err) {
      next(err);
    }
  })
  
  .get('/', async (req, res, next) => {
    try {
      const entry = await Cry.getAll(req.body);
      res.send(entry);
    } catch(err) {
      next(err);
    }
  })

  .get('/:date', async (req, res, next) => {
    try {
      const entry = await Cry.getByDate(req.body);
      res.send(entry);
    } catch(err) {
      next(err);
    }
  })
  
  ;
