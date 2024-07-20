export interface AlbumData {
  readonly album_id: string
  readonly rating: number | null
  readonly title: string
  readonly artist: string
  readonly favourite: boolean
  readonly image_url: string
}

export interface UserAlbumData extends AlbumData {
  readonly user: UserData
  readonly id: string
}

export interface UserAlbums {
  readonly albumId: string[] | null
}

export interface UserData {
  readonly username: string | null
  readonly name: string | null
  readonly token: string | null
  readonly albums: UserAlbums
}

export interface LoginCredentials{
  readonly username: string
  readonly password: string
}

export interface SpotifyToken {
  readonly token: string | null
  readonly refresh: string | null
}

export interface SpotifyUserData {
  readonly id: string
  readonly images: SpotifyImageObject
}

export interface SpotifyImageObject {
  readonly url: string
  readonly height: number
  readonly width: number
}

export interface SpotifyTracklistObject {
  readonly limit: number
  readonly next: string
  readonly offset: number
  readonly previous: string
  readonly total: number
  readonly items: SpotifyTrackObject[]
}
  
export interface SpotifyTrackObject {
  readonly artists: SpotifyArtistObject[]
  readonly disc_number: number
  readonly duration_ms: number
  readonly external_urls: SpotifyLinkObject
  readonly id: string
  readonly name: string
  readonly preview_url: string | null
  readonly track_number: number
}

export interface SpotifyLinkObject {
  readonly spotify: string
}
  
export interface SpotifyArtistObject {
  readonly external_urls: SpotifyLinkObject
  readonly id: string
  readonly name: string
}
  
export interface SpotifyCopyrightObject {
  readonly text: string
  readonly type: string
}

export interface SpotifyAlbumData {
  readonly album_tpe: string
  readonly total_tracks: string
  readonly external_urls: SpotifyLinkObject
  readonly id: string
  readonly images: SpotifyImageObject[]
  readonly name: string
  readonly release_date: string
  readonly artists: SpotifyArtistObject[]
  readonly tracks: SpotifyTracklistObject
  readonly copyrights: SpotifyCopyrightObject
  readonly genres: string[]
  readonly label: string
}

export interface SavedSpotifyAlbum {
  readonly added_at: Date
  readonly album: SpotifyAlbumData
}