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
  