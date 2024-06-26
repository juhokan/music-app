import UserData from "./UserData"

interface AlbumData {
  readonly album_id: string
  readonly rating: Number | null
  readonly title: string
  readonly artist: string
  readonly favourite: boolean
  readonly user: UserData
}

export default AlbumData