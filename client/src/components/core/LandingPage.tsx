import React, { useEffect } from 'react'
import AuthorizeSpotify from '../spotify/AuthorizeSpotify'
import { getAlbum } from '../../services/spotifyService'
import { SpotifyContext } from '../../context'
import SpotifyAlbumData from '../../interface/SpotifyAlbumData'

const LandingPage: React.FC = () => {
  const { tokens } = React.useContext(SpotifyContext)
  const [test, setTest] = React.useState<SpotifyAlbumData | null>(null)

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
    if (tokens?.token) {
      const test = await getAlbum(tokens.token, '0ETFjACtuP2ADo6LFhL6HN')
      return test
    }
    return null
  }

  return (
    <>
      <AuthorizeSpotify />
      <h1>{test?.name}</h1>
    </>

  )
}

export default LandingPage
