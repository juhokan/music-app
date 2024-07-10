import * as express from 'express';
import Album from '../models/album';
import User from '../models/user';

const router = express.Router();

router.post('/reset', async (_request, response) => {
  await Album.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

export default router;
