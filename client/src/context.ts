import React from "react"
import { UserData } from "./types"
import { SpotifyToken } from "./types"
import { UserAlbumData } from "./types"

interface UserCtx {
  readonly user: UserData | null
  readonly setUser: (user: UserData | null) => void
}

interface AlbumsCtx {
  readonly albums: UserAlbumData[] | null
  readonly setAlbums: (albums: UserAlbumData[] | null) => void
}

interface SpotifyCtx {
  readonly tokens: SpotifyToken | null
  readonly setTokens: (tokens: SpotifyToken | null) => void
}

interface SearchCtx {
  readonly input: string | null
  readonly setInput: (input: string | null) => void
}

interface AudioCtx {
  readonly audio: HTMLAudioElement | null
  readonly setAudio: (audio: HTMLAudioElement | null) => void
  readonly id: string | null
  readonly setId: (id: string | null) => void
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

export const SearchContext = React.createContext<SearchCtx>({
  input: null,
  setInput: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const AudioContext = React.createContext<AudioCtx>({
  audio: null,
  setAudio: _ => { /* NOP */ }, // eslint-disable-line @typescript-eslint/no-unused-vars
  id: null,
  setId: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

