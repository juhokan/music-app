import { SpotifyImageObject } from "./SpotifyWrappers"

export interface SpotifyUserData {
  readonly id: string
  readonly images: SpotifyImageObject
}