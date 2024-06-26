/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SpotifyContext, UserContext } from '../../context'
import SpotifyAlbumData from '../../interface/SpotifyAlbumData'
import { getAlbum } from '../../services/spotifyService'
import { postAlbum } from '../../services/albumService'
import { PostAlbumData } from '../../interface/AlbumData'

const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { user } = React.useContext(UserContext)
  const [test, setTest] = React.useState<SpotifyAlbumData | null>(null)
  const { tokens } = React.useContext(SpotifyContext)

  useEffect(() => {
    const fetchTest = async () => {
      console.log(tokens)
      if (tokens?.token) {
        const t = await getTest()
        setTest(t)
      }
    }

    fetchTest()
  }, [user, tokens])

  const getTest = async (): Promise<SpotifyAlbumData | null> => {
    if (tokens?.token && albumId) {
      const test = await getAlbum(tokens.token, albumId)
      return test
    }
    return null
  }

  const handlePostAlbum = async () => {
    if (test && user && user.token) {
      const a: PostAlbumData = {
        album_id: test.id,
        rating: 10,
        title: test.name,
        image_url: test.images[0].url,
        artist: test.artists[0].name,
        favourite: false
  
      }

      await postAlbum(a, user.token)
    }
  }

  return (
    <div>
      <div>{test?.name}</div>
      <button onClick={handlePostAlbum}>add album</button>
    </div>
  )
}

export default AlbumPage

