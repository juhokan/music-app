/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import AlbumsCarousel from '../common/AlbumsCarousel'
import { AlbumsContext, SpotifyContext } from '../../context'
import { AppRoute } from '../../routes'
import { SpotifyAlbumData } from '../../types'
import { getNewReleases } from '../../services/spotifyService'
import { AlbumData } from '../../types'
import { transformSpotifyAlbum } from '../../utils/transformer'

const LandingPage: React.FC = () => {
  const { albums } = React.useContext(AlbumsContext)
  const { tokens } = React.useContext(SpotifyContext)
  const [newReleases, setNewReleases] = React.useState<SpotifyAlbumData[] | null>(null)
  const [transformed, setTransformed] = React.useState<AlbumData[] | null>(null)

  const newest = albums ? [...albums].reverse() : null

  useEffect(() => {
    const fetchNewReleases = async () => {
      if (tokens && tokens.token) {
        const n = await getNewReleases(tokens.token, 10)
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
      <AlbumsCarousel albums={newest} header='recents' route={AppRoute.Search}/>
      {tokens && <AlbumsCarousel albums={transformed} header='new releases' route={AppRoute.Search}/>}
    </>

  )
}

export default LandingPage
