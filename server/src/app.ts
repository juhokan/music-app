import config from './utils/config';
import * as express from 'express';
const app = express();
import * as cors from 'cors';
import logger from './utils/logger';
import mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

if (config.MONGODB_URI) {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB');
    })
    .catch((error: {message: any}) => {
      logger.error('error connection to MongoDB:', error.message);
    });
}

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

export default app;
