import * as express from 'express';
import * as cors from 'cors';
import config from './utils/config';
import mongoose from 'mongoose';
import middleware from './utils/middleware';
import usersRouter from './controllers/users';
import albumRouter from './controllers/albums';
import loginRouter from './controllers/login';
import testingRouter from './controllers/testing';

const app = express();

mongoose.set('strictQuery', false);

console.log('connecting to', config.MONGODB_URI);

if (config.MONGODB_URI) {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch(error => {
      if (error instanceof Error) {
        console.log('error connection to MongoDB:', error.message);
      }
    });
}

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use('/api/albums', albumRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
