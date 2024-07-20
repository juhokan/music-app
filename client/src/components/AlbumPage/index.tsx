/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AlbumsContext, SpotifyContext, UserContext } from '../../context'
import { SpotifyAlbumData } from '../../types'
import { getAlbum } from '../../services/spotifyService'
import { deleteAlbum, getAlbums, postAlbum, putAlbum } from '../../services/albumService'
import { transformSpotifyAlbum } from '../../utils/transformer'
import { UserAlbumData } from '../../types'
import Tracklist from './Tracklist'
import AlbumSkeleton from './AlbumSkeleton'
import './index.css'

const AlbumPage: React.FC = () => {
  const { albums, setAlbums } = React.useContext(AlbumsContext)
  const { albumId } = useParams<{ albumId: string }>()
  const { user } = React.useContext(UserContext)
  const [album, setAlbum] = React.useState<SpotifyAlbumData | null>(null)
  const { tokens } = React.useContext(SpotifyContext)
  const [current, setCurrent] = React.useState<UserAlbumData | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

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
      setLoading(true)
      const s = await getAlbum(tokens.token, albumId)
      setLoading(false)
      return s
    }
    return null
  }

  const handlePostAlbum = async (rating: number | null) => {
    if (album && user && user.token) {
      setLoading(true)
      const a = transformSpotifyAlbum(album, rating, false)
      await postAlbum(a, user.token)
      fetchUserAlbums()
      setLoading(false)
    }
  }

  const handlePutAlbum = async (rating: number) => {
    if (current && album && user && user.token) {
      setLoading(true)
      const a = transformSpotifyAlbum(album, rating, false)
      await putAlbum(a, user.token, current.id)
      fetchUserAlbums()
      setLoading(false)
    }
  }

  const handleDeleteAlbum = async () => {
    if (album && user && user.token && current) {
      setLoading(true)
      await deleteAlbum(user.token, current.id)
      fetchUserAlbums()
      setLoading(false)
    }
  }

  const handleRating = (rating: number) => {
    if (user && user.token && !loading) {
      if (current) {
        if (current.rating !== rating) {
          handlePutAlbum(rating)
        }
        else {
          handleDeleteAlbum()
        }
      }
      else {
        handlePostAlbum(rating)
      }
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
  
  const rating = () => {
    const ratingComponents = []
    for (let i = 1; i <= 10; i++) {
      if (current?.rating && i === current.rating) {
        ratingComponents.push(
          <div key={i} className='rating-component-active' onClick={() => handleRating(i)}>
            <h3 className='rating-text-active'>{i}</h3>
          </div>)
      }
      else {
        ratingComponents.push(
          <div key={i} className='rating-component-inactive' onClick={() => handleRating(i)}>
            <h3 className='rating-text-inactive'>{i}</h3>
          </div>
        )
      }
    }
    return <div className='rating-component'>{ratingComponents}</div>
  }

  return (
    <>
      {album 
        ? 
        (<div className='album-page-container'>
          <div className='album-page-cover-container'>
            <img
              className='album-page-cover' 
              src={album?.images[0].url} 
              alt={`${album?.name} - ${album?.artists[0].name}`} />
          </div>
          {rating()}
          <div className='album-page-text-container'>
            <h1 className='album-page-title'>{album?.name}</h1>
            <h2 className='album-page-artist'>{album?.artists.map(a => a.name).join(', ')}</h2>
            <h3>{album?.release_date.split('-')[0]} - {album?.label}</h3>
            <h3>{album?.genres.join(', ')}</h3>
          </div>
          {album?.tracks && <Tracklist tracklist={album?.tracks}/>}
        </div>) 
        : 
        (<AlbumSkeleton />)}
    </>
  )
}

export default AlbumPage

