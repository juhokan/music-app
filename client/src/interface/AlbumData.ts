import UserData from "./UserData"

export interface PostAlbumData {
  readonly album_id: string
  readonly rating: Number | null
  readonly title: string
  readonly artist: string
  readonly favourite: boolean
  readonly image_url: string
}

export interface AlbumData extends PostAlbumData {
  readonly user: UserData
}