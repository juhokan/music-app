import React, { useEffect } from 'react'
import { AlbumsContext } from '../../context'
import SortedAlbumGrid from '../common/SortedAlbumGrid'
import { UserAlbumData } from '../../types'

const RecentsPage = () => {
  const { albums } = React.useContext(AlbumsContext)
  const [sortedAlbums, setSortedAlbums] = React.useState<UserAlbumData[] | null>(null)

  useEffect(() => {
    if (albums) {
      const a = albums.reverse()
      setSortedAlbums(a)
    }
  }, [albums])

  return (
    <>
      {albums && <SortedAlbumGrid albums={sortedAlbums}/>}
    </>
  )
}

export default RecentsPage