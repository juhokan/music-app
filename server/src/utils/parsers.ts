import {Request} from 'express';
import {AlbumData} from '../types';
import * as jwt from 'jsonwebtoken';
import config from './config';

const secret = config.SECRET;

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumberOrNull = (num: unknown): num is number | null => {
  return typeof num === 'number' || num === null;
};

const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

const isValidRating = (rating: number): boolean => {
  return !isNaN(rating) && rating >= 0 && rating <= 10;
};

const parseAlbumID = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error('Incorrect or missing album id');
  }
  return id;
};

const parseRating = (rating: unknown): number | null => {
  if (!isNumberOrNull(rating)) {
    throw new Error('Incorrect or missing rating');
  }
  const parsedRating = rating as number;
  if (!isValidRating(parsedRating)) {
    throw new Error('Rating must be between 0 and 10');
  }
  return parsedRating;
};

const parseTitle = (title: unknown): string => {
  if (!isString(title)) {
    throw new Error('Incorrect or missing title');
  }
  return title;
};

const parseArtist = (artist: unknown): string => {
  if (!isString(artist)) {
    throw new Error('Incorrect or missing artist');
  }
  return artist;
};

const parseFavourite = (favourite: unknown): boolean => {
  if (!isBoolean(favourite)) {
    throw new Error('Incorrect or missing favourite status');
  }
  return favourite;
};

const parseImageUrl = (imageUrl: unknown): string => {
  if (!isString(imageUrl)) {
    throw new Error('Incorrect or missing image URL');
  }
  return imageUrl;
};

export const toNewAlbumData = (object: unknown): AlbumData => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'album_id' in object &&
    'rating' in object &&
    'title' in object &&
    'album_id' in object &&
    'artist' in object &&
    'favourite' in object &&
    'image_url' in object
  ) {
    const newAlbum: AlbumData = {
      album_id: parseAlbumID(object.album_id),
      rating: parseRating(object.rating),
      title: parseTitle(object.title),
      artist: parseArtist(object.artist),
      favourite: parseFavourite(object.favourite),
      image_url: parseImageUrl(object.image_url),
    };

    return newAlbum;
  }

  throw new Error('Incorrect data: a field missing');
};

export const toTokenData = (req: Request): jwt.JwtPayload | undefined => {
  if ('token' in req && req.token) {
    const token = req.token as string;
    const decoded = jwt.verify(token, secret);
    if (
      !decoded ||
      typeof decoded !== 'object' ||
      !('id' in decoded) ||
      !decoded.id
    ) {
      return;
    }
    return decoded;
  } else {
    return;
  }
};
