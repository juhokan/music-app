import React, { useEffect } from 'react'
import './App.css'
import AlbumData from './interface/AlbumData'
import albumService from './services/albumService'
import { UserContext } from './context'
import LoginForm from './components/LoginForm'

function App() {
  const [albums, setAlbums] = React.useState<AlbumData[] | null>(null)
  const [name, setName] = React.useState<string | null>(null)
  const [username, setUsername] = React.useState<string | null>(null)
  const [id, setId] = React.useState<string | null>(null)
  const [token, setToken] = React.useState<string | null>(null)

  useEffect(() => {
    const getAllAlbums = async () => {
      const a = await albumService.getAlbums()
      setAlbums(a)
    }
    getAllAlbums()
  }, [])

  return (
    <UserContext.Provider value={{name, setName, username, setUsername, id, setId, token, setToken}}>
      {id === null ? 
        (<LoginForm />) 
        : 
        (<div>
          {albums ? (
            albums.map(album => (
              <div key={album.album_id}>{album.title}</div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>)}
    </UserContext.Provider>
  )
}

export default App
