/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../models/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'no secret';

const generateToken = (user: any) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  return jwt.sign(userForToken, secret);
};

export const createUserAndGetToken = async () => {
  const passwordHash = await bcrypt.hash('password', 10);
  const user = new User({
    username: 'test',
    name: 'Test User',
    passwordHash,
  });
  await user.save();

  const token = generateToken(user);
  return {user, token};
};

export const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};
