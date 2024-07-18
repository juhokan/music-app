db.createUser({
  user: 'root',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'music-app-db',
    },
  ],
});

db.createCollection('albums');

db.albums.insert({
  album_id: '0ETFjACtuP2ADo6LFhL6HN',
  rating: 10,
  title: 'Abbey Road (Remastered)',
  artist: 'The Beatles',
  image_url: 'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
  favourite: false,
});
db.albums.insert({
  album_id: '1JvXxLsm0PxlGH4LXzqMGq',
  rating: 10,
  title: 'Remain in Light',
  artist: 'Talking Heads',
  image_url: 'https://i.scdn.co/image/ab67616d0000b273e49a405217bda217816f7bf5',
  favourite: true,
});
