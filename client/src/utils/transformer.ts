import { AlbumData } from "../interface/AlbumData"
import SpotifyAlbumData from "../interface/SpotifyAlbumData"

export const transformSpotifyAlbum = 
  (spotify: SpotifyAlbumData, rating: number | null, favourite: boolean): AlbumData => {
    const album: AlbumData = {
      album_id: spotify.id,
      rating: rating,
      title: spotify.name,
      artist: spotify.artists[0].name,
      favourite: favourite,
      image_url: spotify.images[0].url
    }
    return album
  }