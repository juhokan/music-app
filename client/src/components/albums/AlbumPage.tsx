/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SpotifyContext, UserContext } from '../../context'
import SpotifyAlbumData from '../../interface/SpotifyAlbumData'
import { getAlbum } from '../../services/spotifyService'
import { postAlbum } from '../../services/albumService'
import { transformSpotifyAlbum } from '../../utils/transformer'

const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { user } = React.useContext(UserContext)
  const [album, setAlbum] = React.useState<SpotifyAlbumData | null>(null)
  const { tokens } = React.useContext(SpotifyContext)

  useEffect(() => {
    const fetchAlbum = async () => {
      if (tokens?.token) {
        const t = await getSpotifyAlbum()
        console.log(t)
        setAlbum(t)
      }
    }

    fetchAlbum()
  }, [user, tokens])

  const getSpotifyAlbum = async (): Promise<SpotifyAlbumData | null> => {
    if (tokens?.token && albumId) {
      const s = await getAlbum(tokens.token, albumId)
      return s
    }
    return null
  }

  const handlePostAlbum = async () => {
    if (album && user && user.token) {
      const a = transformSpotifyAlbum(album, null, false)
      await postAlbum(a, user.token)
    }
  }

  return (
    <div className='album-page-container'>
      <div className='album-page-cover-container'>
        <img 
          className='album-page-cover' 
          src={album?.images[0].url} 
          alt={`${album?.name} - ${album?.artists[0].name}`} />
      </div>
      <div className='album-page-text-container'>
        <h1 className='album-page-title'>{album?.name}</h1>
        <h2 className='album-page-artist'>{album?.artists[0].name}</h2>
      </div>
      <button onClick={handlePostAlbum} >add album</button>
    </div>
  )
}

export default AlbumPage

