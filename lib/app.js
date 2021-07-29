import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import crysController from './controllers/crys.js';

const app = express();

app.use(express.json());

app.use('/api/v1/alchemy-cry-lab', crysController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
