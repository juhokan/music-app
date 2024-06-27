import { AlbumData, PostAlbumData } from "../interface/AlbumData"
import SpotifyAlbumData from "../interface/SpotifyAlbumData"
import UserData from "../interface/UserData"

export const transformSpotifyAlbum = 
  (spotify: SpotifyAlbumData, rating: number | null, favourite: boolean, user: UserData): AlbumData => {
    const album: AlbumData = {
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

export const transformSpotifyPostAlbum = 
  (spotify: SpotifyAlbumData, rating: number | null, favourite: boolean): PostAlbumData => {
    const album: PostAlbumData = {
      album_id: spotify.id,
      rating: rating,
      title: spotify.name,
      artist: spotify.artists[0].name,
      favourite: favourite,
      image_url: spotify.images[0].url
    }
    return album
  }