import React from "react"
import UserData from "./interface/UserData"
import AlbumData from "./interface/AlbumData"

interface UserCtx {
  readonly user: UserData | null
  readonly setUser: (user: UserData | null) => void
}

interface AlbumsCtx {
  readonly albums: AlbumData[] | null
  readonly setAlbums: (albums: AlbumData[] | null) => void
}

export const UserContext = React.createContext<UserCtx>({
  user: null,
  setUser: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const AlbumsContext = React.createContext<AlbumsCtx>({
  albums: null,
  setAlbums: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})