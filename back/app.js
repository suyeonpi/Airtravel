import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import { connectDB } from './db/database.js';
import { config } from './config.js';
import cardRouter from './routes/cardRouter.js';
import userRouter from './routes/userRouter.js';
import likeRouter from './routes/likeRouter.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use('/like', likeRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.all('*', (req, res, next) => {
  const err = new Error('Invalid route');
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
connectDB().then(() => {
  console.log('DB connect!');
  app.listen(config.host.port);
});
