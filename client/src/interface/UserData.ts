interface UserAlbums {
  readonly albumId: string[] | null
}

interface UserData {
  readonly username: string | null
  readonly name: string | null
  readonly token: string | null
  readonly albums: UserAlbums
}
  
export default UserData