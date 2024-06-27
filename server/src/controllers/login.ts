/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as express from 'express';
import User from '../models/user';
require('dotenv').config();

const secret = process.env.SECRET || 'no_secret';

const loginRouter = express.Router();

loginRouter.post('/', async (request: any, response: any) => {
  const {username, password} = request.body;

  const user = await User.findOne({username});
  if (user?.passwordHash) {
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password',
      });
    }
  }

  const userForToken = {
    username: user?.username,
    id: user?._id,
  };

  const token = jwt.sign(userForToken, secret);

  response
    .status(200)
    .send({token, username: user?.username, name: user?.name});
});

export default loginRouter;
