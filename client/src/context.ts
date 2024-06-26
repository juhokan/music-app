import React from "react"
import UserData from "./interface/UserData"
import AlbumData from "./interface/AlbumData"
import SpotifyToken from "./interface/SpotifyToken"

interface UserCtx {
  readonly user: UserData | null
  readonly setUser: (user: UserData | null) => void
}

interface AlbumsCtx {
  readonly albums: AlbumData[] | null
  readonly setAlbums: (albums: AlbumData[] | null) => void
}

interface SpotifyCtx {
  readonly tokens: SpotifyToken | null
  readonly setTokens: (tokens: SpotifyToken | null) => void
}

export const UserContext = React.createContext<UserCtx>({
  user: null,
  setUser: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const AlbumsContext = React.createContext<AlbumsCtx>({
  albums: null,
  setAlbums: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const SpotifyContext = React.createContext<SpotifyCtx>({
  tokens: null,
  setTokens: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})