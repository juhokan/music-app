/* eslint-disable @typescript-eslint/no-explicit-any */
import * as bcrypt from 'bcrypt';
import * as express from 'express';
const usersRouter = express.Router();
import User from '../models/user';

usersRouter.get('/', async (request: any, response: any) => {
  const users = await User.find({}).populate('albums', {
    album_id: 1,
    title: 1,
    artist: 1,
    rating: 1,
    favourite: 1,
  });
  response.json(users);
});

usersRouter.post('/', async (request: any, response: any) => {
  const {username, name, password} = request.body;

  if (!username || username.length < 3) {
    return response
      .status(400)
      .json({error: 'username must be at least 3 characters long'});
  }

  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({error: 'password must be at least 3 characters long'});
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error: any) {
    if (error.code === 11000) {
      return response.status(400).json({error: 'username must be unique'});
    }
    response.status(500).json({error: 'something went wrong'});
  }
});

export default usersRouter;
