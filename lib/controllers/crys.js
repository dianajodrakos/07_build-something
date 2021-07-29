import { Router } from 'express';
import Cry from '../models/Cry.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      console.log('crys.js req.body', req.body);
      const entry = await Cry.create(req.body);
      res.send(entry);
    } catch (err) {
      next(err);
    }
  });
