import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SpotifyContext } from '../../context'
import SpotifyAlbumData from '../../interface/SpotifyAlbumData'
import { getAlbum } from '../../services/spotifyService'

const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const [test, setTest] = React.useState<SpotifyAlbumData | null>(null)
  const { tokens } = React.useContext(SpotifyContext)

  useEffect(() => {
    const fetchTest = async () => {
      if (tokens?.token) {
        const t = await getTest()
        setTest(t)
      }
    }

    fetchTest()
  }, [])

  const getTest = async (): Promise<SpotifyAlbumData | null> => {
    if (tokens?.token && albumId) {
      const test = await getAlbum(tokens.token, albumId)
      return test
    }
    return null
  }
  return (
    <div>{test?.name}</div>
  )
}

export default AlbumPage
