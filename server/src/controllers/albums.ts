import {Request, Response} from 'express';
import Album from '../models/album';
import * as express from 'express';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

const secret = process.env.SECRET || 'no_secret';

const albumRouter = express.Router();

albumRouter.get('/', async (_request, response) => {
  const albums = await Album.find({}).populate('user', {username: 1, name: 1});
  response.json(albums);
});

albumRouter.post('/', async (request: Request, response: Response, next) => {
  try {
    const body = request.body;
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

    if (!body.album_id) {
      return response.status(400).json({error: 'album_id missing'});
    }

    if (!body.image_url) {
      return response.status(400).json({error: 'image_url missing'});
    }

    if (body.rating > 10 || body.rating < 0) {
      return response.status(400).json({error: 'rating out of bounds'});
    }

    const existingAlbum = await Album.findOne({
      album_id: body.album_id,
      user: user._id,
    });

    if (existingAlbum) {
      return response.status(400).json({
        error: `Album with album_id ${body.album_id} already exists for this user`,
      });
    }

    const album = new Album({
      album_id: body.album_id,
      rating: body.rating,
      title: body.title,
      artist: body.artist,
      image_url: body.image_url,
      favourite: body.favourite,
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
  const body = request.body;

  const updatedAlbum = {
    album_id: body.album_id,
    rating: body.rating,
    title: body.title,
    artist: body.artist,
    image_url: body.image_url,
    favourite: body.favourite,
  };

  try {
    const album = await Album.findByIdAndUpdate(
      request.params.id,
      updatedAlbum
    );
    response.json(album);
  } catch (exception) {
    next(exception);
  }
});

export default albumRouter;
