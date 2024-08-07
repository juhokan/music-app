/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import './App.css'
import './theme/theme.css'
import { UserAlbumData } from './types'
import { getAlbums } from './services/albumService'
import { AlbumsContext, SearchContext, SpotifyContext, UserContext, AudioContext } from './context'
import { UserData } from './types'
import AppContainer from './components/AppContainer'
import { SpotifyToken } from './types'
import { refreshSpotifyToken } from './services/spotifyService'

const USER_KEY = 'user'
const SPOTIFY_TOKEN = 'spotify'

const App: React.FC = () => {
  const [albums, setAlbums] = React.useState<UserAlbumData[] | null>(null)
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null)
  const [id, setId] = React.useState<string | null>(null)
  const [user, setUser] = React.useState<UserData | null>(null)
  const [tokens, setTokens] = React.useState<SpotifyToken | null>(null)
  const [input, setInput] = React.useState<string | null>(null)

  useEffect(() => {
    fetchAlbums()
    initUser()
    initSpotifyToken()
  }, [])

  const fetchAlbums = async () => {
    const a = await getAlbums()
    setAlbums(a)
  }

  const initSpotifyToken = () => {
    const s = window.localStorage.getItem(SPOTIFY_TOKEN)
    if (s) {
      const spotify = JSON.parse(s)
      setAndSaveSpotifyTokens(spotify)
    }
  }

  const initUser = () => {
    const u = window.localStorage.getItem(USER_KEY)
    if (u) {
      const user = JSON.parse(u)
      setAndSaveUser(user)
    }
  }

  const setAndSaveUser = (u: UserData | null) => {
    setUser(u)
    if (u) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(u))
    }
    else {
      window.localStorage.removeItem(USER_KEY)
    }
  }

  const setAndSaveSpotifyTokens = async (s: SpotifyToken | null) => {
    window.localStorage.removeItem(SPOTIFY_TOKEN)
    if (s && s.refresh) {
      const t = await refreshSpotifyToken(s.refresh)
      window.localStorage.setItem(SPOTIFY_TOKEN, JSON.stringify(t))
      setTokens(t)
    }
    else {
      setTokens(s)
    }
  }

  return (
    <UserContext.Provider value={{user, setUser: setAndSaveUser}}>
      <SpotifyContext.Provider value={{tokens, setTokens: setAndSaveSpotifyTokens}}>
        <AlbumsContext.Provider value={{albums, setAlbums}}>
          <SearchContext.Provider value={{input, setInput}}>
            <AudioContext.Provider value={{audio, setAudio, id, setId}}>
              <AppContainer />
            </AudioContext.Provider>
          </SearchContext.Provider>
        </AlbumsContext.Provider>
      </SpotifyContext.Provider>
    </UserContext.Provider>
  )
}

export default App
