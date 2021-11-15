import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import { connectDB } from './db/database.js';
import { config } from './config.js';
import cardRouter from './routes/cardRouter.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/cards', cardRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB().then(() => {
  console.log('DB connect!');
  app.listen(config.host.port);
});