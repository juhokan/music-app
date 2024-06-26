import React, { useEffect } from 'react'
import './App.css'
import AlbumData from './interface/AlbumData'
import albumService from './services/albumService'

function App() {
  const [albums, setAlbums] = React.useState<AlbumData[] | null>(null)

  useEffect(() => {
    const getAllAlbums = async () => {
      const a = await albumService.getAlbums()
      setAlbums(a)
    }
    getAllAlbums()
  }, [])

  return (
    <>
      {albums?.map(album => (
        <div key={album.album_id}>{album.title}</div>
      ))}
    </>
  )
}

export default App
