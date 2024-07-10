import {Request, Response} from 'express';
import Album from '../models/album';
import * as express from 'express';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import {toNewAlbumData} from '../utils/parsers';
require('dotenv').config();

const secret = process.env.SECRET || 'no_secret';

const albumRouter = express.Router();

albumRouter.get('/', async (_request, response) => {
  const albums = await Album.find({}).populate('user', {username: 1, name: 1});
  response.json(albums);
});

albumRouter.post('/', async (request: Request, response: Response, next) => {
  try {
    const data = toNewAlbumData(request.body);
    let token;

    if ('token' in request && request.token) {
      token = request.token as string;
    } else {
      return response.status(401).json({error: 'token invalid'});
    }

    const decodedToken = jwt.verify(token, secret);

    if (
      !decodedToken ||
      typeof decodedToken !== 'object' ||
      !('id' in decodedToken) ||
      !decodedToken.id
    ) {
      return response.status(401).json({error: 'token invalid'});
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({error: 'user not found'});
    }

    const existingAlbum = await Album.findOne({
      album_id: data.album_id,
      user: user._id,
    });

    if (existingAlbum) {
      return response.status(400).json({
        error: `Album with album_id ${data.album_id} already exists for this user`,
      });
    }

    const album = new Album({
      ...data,
      user: user._id,
    });

    const savedAlbum = await album.save();

    user.albums = user.albums.concat(savedAlbum._id);
    await user.save();

    response.status(201).json(savedAlbum);
  } catch (error) {
    return next(error);
  }
});

albumRouter.delete('/:id', async (request, response, next) => {
  try {
    let token;

    if ('token' in request && request.token) {
      token = request.token as string;
    } else {
      return response.status(401).json({error: 'token invalid'});
    }

    const decodedToken = jwt.verify(token, secret);

    if (
      !request.token ||
      !decodedToken ||
      typeof decodedToken !== 'object' ||
      !('id' in decodedToken) ||
      !decodedToken.id
    ) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const album = await Album.findById(request.params.id);

    if (!album) {
      return response.status(404).json({error: 'Album not found'});
    }

    if (album.user?.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({error: 'token invalid'});
    }

    await album.deleteOne();

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(404).json({error: 'User not found'});
    }

    user.albums = user.albums.filter(
      albumId => albumId.toString() !== request.params.id
    );

    await user.save();

    response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

albumRouter.put('/:id', async (request, response, next) => {
  const data = toNewAlbumData(request.body);

  try {
    const album = await Album.findByIdAndUpdate(request.params.id, data);
    response.json(album);
  } catch (exception) {
    next(exception);
  }
});

export default albumRouter;
