import Album from '../models/album'
import * as express from 'express'
import User from '../models/user'
import * as jwt from 'jsonwebtoken'
require('dotenv').config()

const secret = process.env.SECRET || 'no_secret'

const albumRouter = express.Router()


albumRouter.get('/', async (request, response) => {
  const albums = await Album
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(albums)
})


albumRouter.post('/', async (request: any, response: any, next) => {
  try {
    const body = request.body;
    let token

    if (request.token) {
      token = request.token;
    }
    else {
      return response.status(401).json({ error: 'token invalid' });
    }

    const decodedToken = jwt.verify(token, secret);

    if (!decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken) || !decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
    

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({ error: 'user not found' });
    }

    if (!body.album_id || !body.rating) {
      return response.status(400).json({ error: 'album or rating missing' });
    }

    const album = new Album({
      album_id: body.album_id,
      rating: body.rating,
      title: body.title,
      artist: body.artist,
      image_url: body.url,
      favourite: body.favourite,
      user: user._id
    });

    const savedAlbum = await album.save();

    user.albums = user.albums.concat(savedAlbum._id);
    await user.save();

    response.status(201).json(savedAlbum);
  } catch (error) {
    next(error);
  }
});


albumRouter.delete('/:id', async (request: any, response: any, next) => {
  try {
    const decodedToken = jwt.verify(request.token, secret);

    if (!request.token || !decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken) || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      });
    }

    const album = await Album.findById(request.params.id);

    if (!album) {
      return response.status(404).json({ error: 'Album not found' });
    }

    if (album.user?.toString() === decodedToken.id.toString()) {
      await album.deleteOne();
      response.status(204).end();
    } else {
      response.status(401).json({ error: 'token invalid' });
    }
  } catch (error) {
    next(error);
  }
});


albumRouter.put('/:id', async (request: any, response: any, next) => {
  const body = request.body

  const updatedBlog = {
    album_id: body.album_id,
    rating: body.rating,
    title: body.title,
    artist: body.artist,
    image_url: body.url,
    favourite: body.favourite
  }

  try {
    const album = await Album.findByIdAndUpdate(request.params.id, updatedBlog)
    response.json(album)
  } catch (exception) {
    next(exception)
  }
})

export default albumRouter