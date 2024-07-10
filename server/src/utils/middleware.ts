import {Request, Response, NextFunction} from 'express';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};

declare module 'express' {
  interface Request {
    token?: string;
  }
}

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const auth = req.get('authorization');
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '');
  }
  next();
};

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({error: 'unknown endpoint'});
};

const errorHandler = (error: Error, _req: Request, res: Response) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({error: error.message});
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res.status(400).json({error: 'expected `username` to be unique'});
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({error: 'token missing or invalid'});
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  }
  return res.status(500).json({error: 'unknown error'});
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
