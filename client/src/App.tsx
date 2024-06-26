import React, { useEffect } from 'react'
import './App.css'
import AlbumData from './interface/AlbumData'
import albumService from './services/albumService'
import { AlbumsContext, UserContext } from './context'
import LoginForm from './components/LoginForm'
import UserData from './interface/UserData'

const USER_KEY = 'user'

const App: React.FC = () => {
  const [albums, setAlbums] = React.useState<AlbumData[] | null>(null)
  const [user, setUser] = React.useState<UserData | null>(null)

  useEffect(() => {
    fetchAlbums()
    initUser()
  }, [])

  const fetchAlbums = async () => {
    const a = await albumService.getAlbums()
    setAlbums(a)
  }

  const initUser = () => {
    const u = window.localStorage.getItem(USER_KEY)
    if (u) {
      const user = JSON.parse(u)
      setAndSaveUser(user)
    }
  }

  const setAndSaveUser = (u: UserData | null) => {
    window.localStorage.removeItem(USER_KEY)

    if (u) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(u))
      setUser(u)
    }
  }

  return (
    <UserContext.Provider value={{user, setUser: setAndSaveUser}}>
      <AlbumsContext.Provider value={{albums, setAlbums}}>
        {user === null ? 
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
      </AlbumsContext.Provider>
    </UserContext.Provider>
  )
}

export default App
