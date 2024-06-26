/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AlbumsContext, SpotifyContext, UserContext } from '../../context'
import SpotifyAlbumData from '../../interface/SpotifyAlbumData'
import { getAlbum } from '../../services/spotifyService'
import { deleteAlbum, getAlbums, postAlbum } from '../../services/albumService'
import { transformSpotifyAlbum } from '../../utils/transformer'
import { UserAlbumData } from '../../interface/AlbumData'
import Tracklist from '../tracks/Tracklist'

const AlbumPage: React.FC = () => {
  const { albums, setAlbums } = React.useContext(AlbumsContext)
  const { albumId } = useParams<{ albumId: string }>()
  const { user } = React.useContext(UserContext)
  const [album, setAlbum] = React.useState<SpotifyAlbumData | null>(null)
  const { tokens } = React.useContext(SpotifyContext)
  const [current, setCurrent] = React.useState<UserAlbumData | null>(null)

  useEffect(() => {
    const fetchAlbum = async () => {
      if (tokens?.token) {
        const t = await getSpotifyAlbum()
        setAlbum(t)
      }
    }
    fetchAlbum()
    
  }, [user, tokens])

  useEffect(() => {
    if (user && albums) {
      checkCurrent()
    }
  }, [album, albums])

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
      fetchUserAlbums()
    }
  }

  const handleDeleteAlbum = async () => {
    if (album && user && user.token && current) {
      await deleteAlbum(user.token, current.id)
      fetchUserAlbums()
    }
  }

  const checkCurrent = () => {
    const currentAlbum = albums?.find(a => a.album_id === album?.id && user?.username === a.user.username)
    setCurrent(currentAlbum || null)
  }

  const fetchUserAlbums = async () => {
    const n = await getAlbums()
    setAlbums(n)
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
      {album?.tracks && <Tracklist tracklist={album?.tracks}/>}
      {current && <div>added</div>}
      <button onClick={handlePostAlbum} >add album</button>
      {current && <button onClick={handleDeleteAlbum} >remove album</button>}
    </div>
  )
}

export default AlbumPage

