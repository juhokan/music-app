import { UserAlbumData, AlbumData } from "../interface/AlbumData"
import SpotifyAlbumData from "../interface/SpotifyAlbumData"
import UserData from "../interface/UserData"

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

export const transformSpotifyUserAlbum = 
  (spotify: SpotifyAlbumData, rating: number | null, favourite: boolean, user: UserData): UserAlbumData => {
    const album: UserAlbumData = {
      album_id: spotify.id,
      rating: rating,
      title: spotify.name,
      artist: spotify.artists[0].name,
      favourite: favourite,
      image_url: spotify.images[0].url,
      user: user
    }
    return album
  }