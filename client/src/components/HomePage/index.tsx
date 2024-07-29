/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Skeleton } from 'primereact/skeleton'
import AlbumsCarousel from '../common/AlbumsCarousel'
import { AlbumsContext, SpotifyContext } from '../../context'
import { AppRoute } from '../../routes'
import { SpotifyAlbumData } from '../../types'
import { getNewReleases } from '../../services/spotifyService'
import { AlbumData } from '../../types'
import { transformSpotifyAlbum } from '../../utils/transformer'

const HomePage: React.FC = () => {
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
      {newest 
        ?
        (<AlbumsCarousel albums={newest} header='Recents' route={AppRoute.Recent}/>)
        :
        (<Skeleton height='400px' width='100%' className='m-2'></Skeleton>)}
      {tokens && (
        newReleases
          ? 
          (<AlbumsCarousel albums={transformed} header='New Releases' route={AppRoute.Search}/>) 
          : 
          (<div>
            <div className='header-link-container'>
              <h1 className='header-link-title'>New Releases</h1>
            </div>
            <Skeleton height='400px' width='100%' className='m-2'></Skeleton>
          </div>)
      )}
    </>

  )
}

export default HomePage
