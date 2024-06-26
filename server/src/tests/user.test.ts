/* eslint-disable n/no-unpublished-import */
import User from '../models/user';
import * as helper from './testHelper';
import {test, after, describe, beforeEach} from 'node:test';
import mongoose from 'mongoose';
import * as supertest from 'supertest';
import app from '../app';

const api = supertest(app);

describe('when there is initially no users at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'test',
      name: 'Test User',
      password: 'secret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('creation fails if username already taken', async () => {
    const newUser = {
      username: 'test',
      name: 'Test User',
      password: 'secret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const duplicateUser = {
      username: 'test',
      name: 'Test User',
      password: 'secret',
    };

    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

test('creation fails if username is less than 3 characters', async () => {
  const newUser = {
    username: 'ro',
    name: 'Test User',
    password: 'secret',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('creation fails if password is less than 3 characters', async () => {
  const newUser = {
    username: 'rootuser',
    name: 'Test User',
    password: 'pw',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
