import React, { useEffect } from 'react'
import AlbumsCarousel from '../albums/AlbumsCarousel'
import { AlbumsContext, SpotifyContext } from '../../context'
import { AppRoute } from '../../routes'
import SpotifyAlbumData from '../../interface/SpotifyAlbumData'
import { getNewReleases } from '../../services/spotifyService'
import { AlbumData } from '../../interface/AlbumData'
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
      {tokens && <AlbumsCarousel albums={transformed} header='New Releases' route={AppRoute.Search}/>}
      <AlbumsCarousel albums={newest} header='Recents' route={AppRoute.Search}/>
    </>

  )
}

export default LandingPage
