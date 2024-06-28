import UserData from "./UserData"

export interface AlbumData {
  readonly album_id: string
  readonly rating: Number | null
  readonly title: string
  readonly artist: string
  readonly favourite: boolean
  readonly image_url: string
}

export interface UserAlbumData extends AlbumData {
  readonly user: UserData
}