/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { getNewReleases } from '../../services/spotifyService'
import { AlbumData, SpotifyAlbumData } from '../../types'
import { SpotifyContext } from '../../context'
import { transformSpotifyAlbum } from '../../utils/transformer'
import AlbumGrid from '../common/AlbumGrid'

const NewReleasesPage = () => {
  const { tokens } = React.useContext(SpotifyContext)
  const [newReleases, setNewReleases] = React.useState<SpotifyAlbumData[] | null>(null)
  const [transformed, setTransformed] = React.useState<AlbumData[] | null>(null)
  
  useEffect(() => {
    const fetchNewReleases = async () => {
      if (tokens && tokens.token) {
        const n = await getNewReleases(tokens.token, 50)
        setNewReleases(n)
      }
    }
    fetchNewReleases()
  }, [tokens])

  useEffect(() => {
    transformNewReleases()
  }, [newReleases])

  const transformNewReleases = () => {
    const l: AlbumData[] = []
    newReleases?.forEach(a => {
      const t = transformSpotifyAlbum(a, null, false)
      l.push(t)
    })
    setTransformed(l)
  }

  return (
    <>
      {newReleases && <AlbumGrid albums={transformed} />}
    </>
  )
}

export default NewReleasesPage