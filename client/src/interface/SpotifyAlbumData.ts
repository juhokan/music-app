import {
  SpotifyArtistObject,
  SpotifyCopyrightObject,
  SpotifyImageObject,
  SpotifyLinkObject,
  SpotifyTracklistObject
} from "./SpotifyWrappers"


interface SpotifyAlbumData {
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
      
export default SpotifyAlbumData