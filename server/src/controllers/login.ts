import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import User from '../models/user';
import config from '../utils/config';
import {toNewLoginData} from '../utils/parsers';

const secret = config.SECRET;

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
  try {
    const data = toNewLoginData(request.body);

    const user = await User.findOne({username: data.username});
    if (!user) {
      return response.status(401).json({
        error: 'invalid username or password',
      });
    }
    if (user?.passwordHash) {
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(data.password, user.passwordHash);

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

    return response
      .status(200)
      .json({token, username: user?.username, name: user?.name});
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({error: error.message});
    }
    return response.status(500).json('unknown error creating user');
  }
});

export default loginRouter;
