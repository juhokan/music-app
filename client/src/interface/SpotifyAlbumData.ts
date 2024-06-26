interface SpotifyLinkObject {
  readonly spotify: string
}

interface SpotifyImageObject {
  readonly url: string
  readonly height: number
  readonly width: number
}

interface SpotifyArtistObject {
  readonly external_urls: SpotifyLinkObject
  readonly id: string
  readonly name: string
}

interface SpotifyCopyrightObject {
  readonly text: string
  readonly type: string
}

interface SpotifyTracklistObject {
  readonly limit: number
  readonly next: string
  readonly offset: number
  readonly previous: string
  readonly total: number
  readonly items: SpotifyTrackObject[]
}

interface SpotifyTrackObject {
  readonly artists: SpotifyArtistObject[]
  readonly disc_number: number
  readonly duration_ms: number
  readonly external_urls: SpotifyLinkObject
  readonly id: string
  readonly name: string
  readonly preview_url: string | null
  readonly track_number: number
}

interface SpotifyAlbumData {
  readonly album_tpe: string
  readonly total_tracks: string
  readonly external_urls: SpotifyLinkObject
  readonly id: string
  readonly imaged: SpotifyImageObject[]
  readonly name: string
  readonly release_date: string
  readonly artists: SpotifyArtistObject[]
  readonly tracks: SpotifyTracklistObject
  readonly copyrights: SpotifyCopyrightObject
  readonly genres: string[]
  readonly lablel: string

}
      
export default SpotifyAlbumData