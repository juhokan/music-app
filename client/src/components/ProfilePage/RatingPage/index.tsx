import React, { useEffect } from 'react'
import { UserAlbumData } from '../../../types'
import { AlbumsContext, UserContext } from '../../../context'
import SortedAlbumGrid from '../../common/SortedAlbumGrid'

const RatingPage: React.FC = () => {
  const { user } = React.useContext(UserContext)
  const { albums } = React.useContext(AlbumsContext)
  const [usersAlbums, setUsersAlbums] = React.useState<UserAlbumData[] | null>(null)

  useEffect(() => {
    if (user && albums) {
      const filtered = albums.filter(album => album.user.username === user.username).reverse()
      setUsersAlbums(filtered)
    }
  }, [user, albums])
  
  return (
    <SortedAlbumGrid albums={usersAlbums}/> 
  )
}

export default RatingPage