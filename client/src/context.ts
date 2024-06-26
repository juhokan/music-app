import React from "react"
import UserData from "./interface/UserData"

interface UserCtx {
  readonly user: UserData | null
  readonly setUser: (user: UserData | null) => void
}

export const UserContext = React.createContext<UserCtx>({
  user: null,
  setUser: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})