/* eslint-disable n/no-unpublished-import */
import {test, after, beforeEach} from 'node:test';
import mongoose from 'mongoose';
import assert = require('node:assert');
import * as supertest from 'supertest';
import app from '../app';
import Album from '../models/album';
import User from '../models/user';
import {createUserAndGetToken} from './testHelper';
import {AlbumData} from '../types';

const api = supertest(app);

let token: string;

interface TestAlbumData extends AlbumData {
  readonly id: string;
}

const initialAlbums = [
  {
    _id: '667c69e4f8a72afc5f501b6a',
    album_id: '0ETFjACtuP2ADo6LFhL6HN',
    rating: 10,
    title: 'Abbey Road (Remastered)',
    artist: 'The Beatles',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
    favourite: false,
    __v: 0,
  },
  {
    _id: '667c6d0128cb78c6c1da30f3',
    album_id: '1JvXxLsm0PxlGH4LXzqMGq',
    rating: 10,
    title: 'Remain in Light',
    artist: 'Talking Heads',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273e49a405217bda217816f7bf5',
    favourite: true,
    __v: 0,
  },
  {
    _id: '667c6d2828cb78c6c1da30fe',
    album_id: '6dVIqQ8qmQ5GBnJ9shOYGE',
    rating: 10,
    title: 'OK Computer',
    artist: 'Radiohead',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856',
    favourite: false,
    __v: 0,
  },
];

beforeEach(async () => {
  await Album.deleteMany({});
  let albumObject = new Album(initialAlbums[0]);
  await albumObject.save();
  albumObject = new Album(initialAlbums[1]);
  await albumObject.save();
  albumObject = new Album(initialAlbums[2]);
  await albumObject.save();
});

beforeEach(async () => {
  await User.deleteMany({});
  const result = await createUserAndGetToken();
  token = result.token;
});

test('there are three albums', async () => {
  const response = await api.get('/api/albums');

  assert.strictEqual(response.body.length, initialAlbums.length);
});

test('identifying field is id', async () => {
  const response = await api.get('/api/Albums');

  response.body.forEach((album: TestAlbumData) => {
    assert.strictEqual(typeof album.id, 'string');
  });
});

test('albums are returned as json', async () => {
  await api
    .get('/api/albums')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('POST /api/albums works', async () => {
  const before = await Album.find({});

  const newAlbum = {
    album_id: '48D1hRORqJq52qsnUYZX56',
    rating: 10,
    title:
      'The Rise and Fall of Ziggy Stardust and the Spiders from Mars (2012 Remaster)',
    artist: 'David Bowie',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
    favourite: false,
  };

  await api
    .post('/api/albums')
    .set('Authorization', `Bearer ${token}`)
    .send(newAlbum)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const after = await Album.find({});
  assert.strictEqual(before.length + 1, after.length);

  const ids = after.map(album => album.album_id);
  assert(ids.includes('48D1hRORqJq52qsnUYZX56'));
});

test('POST /api/Albums returns 401 without token', async () => {
  const newAlbum = {
    album_id: '48D1hRORqJq52qsnUYZX56',
    rating: 10,
    title:
      'The Rise and Fall of Ziggy Stardust and the Spiders from Mars (2012 Remaster)',
    artist: 'David Bowie',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
    favourite: false,
  };

  await api.post('/api/Albums').send(newAlbum).expect(401);
});

test('POST /api/Albums check empty title returns 400 Bad request', async () => {
  const newAlbum = {
    album_id: '48D1hRORqJq52qsnUYZX56',
    rating: 10,
    artist: 'David Bowie',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
    favourite: false,
  };

  await api
    .post('/api/Albums')
    .set('Authorization', `Bearer ${token}`)
    .send(newAlbum)
    .expect(400);
});

test('POST /api/Albums check empty image returns 400 Bad request', async () => {
  const newAlbum = {
    album_id: '48D1hRORqJq52qsnUYZX56',
    rating: 10,
    title:
      'The Rise and Fall of Ziggy Stardust and the Spiders from Mars (2012 Remaster)',
    artist: 'David Bowie',
    favourite: false,
  };

  await api
    .post('/api/Albums')
    .set('Authorization', `Bearer ${token}`)
    .send(newAlbum)
    .expect(400);
});

test('POST /api/Albums check duplicate albums for user and returns 400 Bad request', async () => {
  const newAlbum = {
    album_id: '0ETFjACtuP2ADo6LFhL6HN',
    rating: 10,
    title: 'Abbey Road (Remastered)',
    artist: 'The Beatles',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
    favourite: false,
  };

  await api
    .post('/api/Albums')
    .set('Authorization', `Bearer ${token}`)
    .send(newAlbum)
    .expect(201);

  const duplicateAlbum = {
    album_id: '0ETFjACtuP2ADo6LFhL6HN',
    rating: 10,
    title: 'Abbey Road (Remastered)',
    artist: 'The Beatles',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
    favourite: false,
  };

  await api
    .post('/api/Albums')
    .set('Authorization', `Bearer ${token}`)
    .send(duplicateAlbum)
    .expect(400);
});

test('DELETE /api/Albums/:id deletes a Album post', async () => {
  const newAlbum = {
    album_id: '48D1hRORqJq52qsnUYZX56',
    rating: 10,
    title:
      'The Rise and Fall of Ziggy Stardust and the Spiders from Mars (2012 Remaster)',
    artist: 'David Bowie',
    image_url: 'url',
    favourite: false,
  };

  await api
    .post('/api/Albums')
    .set('Authorization', `Bearer ${token}`)
    .send(newAlbum)
    .expect(201);

  const albumsAtStart = await Album.find({});
  const albumToDelete = albumsAtStart.find(
    album => album.album_id === newAlbum.album_id
  );
  if (albumToDelete) {
    await api
      .delete(`/api/Albums/${albumToDelete._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const albumsAtEnd = await Album.find({});
    assert.strictEqual(albumsAtEnd.length, albumsAtStart.length - 1);

    const titles = albumsAtEnd.map(album => album.title);
    assert(!titles.includes(albumToDelete.title));
  }
});

test('PUT /api/Albums/:id updates a Album post', async () => {
  const albumsAtStart = await Album.find({});
  const albumToUpdate = albumsAtStart[0];

  const updatedAlbum = {
    album_id: '0ETFjACtuP2ADo6LFhL6HN',
    rating: 9,
    title: 'Abbey Road (Remastered)',
    artist: 'The Beatles',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
    favourite: false,
  };

  await api
    .put(`/api/Albums/${albumToUpdate._id}`)
    .send(updatedAlbum)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const albumsAtEnd = await Album.find({});
  const updatedAlbumInDb = albumsAtEnd.find(
    Album => Album._id.toString() === albumToUpdate._id.toString()
  );

  if (updatedAlbumInDb) {
    assert.strictEqual(updatedAlbumInDb.title, updatedAlbum.title);
    assert.strictEqual(updatedAlbumInDb.artist, updatedAlbum.artist);
    assert.strictEqual(updatedAlbumInDb.image_url, updatedAlbum.image_url);
    assert.strictEqual(updatedAlbumInDb.album_id, updatedAlbum.album_id);
  }
});

after(async () => {
  await mongoose.connection.close();
});
