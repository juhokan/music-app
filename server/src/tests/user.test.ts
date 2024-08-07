/* eslint-disable n/no-unpublished-import */
import User from '../models/user';
import {test, after, describe, beforeEach} from 'node:test';
import mongoose from 'mongoose';
import * as supertest from 'supertest';
import app from '../app';
import Album from '../models/album';
import {usersInDb} from './testHelper';

const api = supertest(app);

describe('when there is initially no users at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({username: 'root', passwordHash: 'hash'});

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'test',
      name: 'Test User',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('creation fails with taken username', async () => {
    const newUser = {
      username: 'root',
      name: 'Test User',
      password: 'password',
    };

    const b = await usersInDb();
    console.log('Users in DB before insertion:', b);

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const a = await usersInDb();
    console.log('Users in DB after insertion:', a);
  });
});

test('creation fails if username is less than 3 characters', async () => {
  const newUser = {
    username: 'ro',
    name: 'Test User',
    password: 'password',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('creation fails if password is less than 8 characters', async () => {
  const newUser = {
    username: 'rootuser',
    name: 'Test User',
    password: 'passwrd',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

after(async () => {
  await User.deleteMany({});
  await Album.deleteMany({});
  await mongoose.connection.close();
});
