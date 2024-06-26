import React from "react"
import UserData from "./interface/UserData"

interface UserCtx extends UserData {
  readonly setUsername: (username: string | null) => void
  readonly setName: (name: string | null) => void
  readonly setId: (id: string | null) => void
  readonly setToken: (token: string | null) => void
}

export const UserContext = React.createContext<UserCtx>({
  username: null,
  setUsername: _ => { /* NOP */ }, // eslint-disable-line @typescript-eslint/no-unused-vars
  name: null,
  setName: _ => { /* NOP */ }, // eslint-disable-line @typescript-eslint/no-unused-vars
  id: null,
  setId: _ => { /* NOP */ }, // eslint-disable-line @typescript-eslint/no-unused-vars
  token: null, 
  setToken: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})