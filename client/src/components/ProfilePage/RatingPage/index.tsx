import React, { useEffect } from 'react'
import AlbumGrid from '../../common/AlbumGrid'
import { UserAlbumData } from '../../../types';
import { AlbumsContext, UserContext } from '../../../context';

const RatingPage: React.FC = () => {
  const { user } = React.useContext(UserContext)
  const { albums } = React.useContext(AlbumsContext)
  const [usersAlbums, setUsersAlbums] = React.useState<UserAlbumData[] | null>(null)

  useEffect(() => {
    if (user && albums) {
      const filtered = albums.filter(album => album.user.username === user.username)
      setUsersAlbums(filtered.reverse())
    }
  }, [user, albums])

  
  return (
    <AlbumGrid albums={usersAlbums}/>
  )
}

export default RatingPage