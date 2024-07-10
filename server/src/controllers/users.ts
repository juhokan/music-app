import * as bcrypt from 'bcrypt';
import * as express from 'express';
const usersRouter = express.Router();
import User from '../models/user';
import {toNewUserData} from '../utils/parsers';

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({}).populate('albums', {
    album_id: 1,
    title: 1,
    artist: 1,
    rating: 1,
    favourite: 1,
  });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const data = toNewUserData(request.body);
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const user = new User({
      username: data.username,
      name: data.name,
      passwordHash,
    });
    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return response.status(400).json({error: 'username must be unique'});
    }
    if (error instanceof Error) {
      return response.status(400).json({error: error.message});
    }
    return response.status(500).json('unknown error creating user');
  }
});

export default usersRouter;
