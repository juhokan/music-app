/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import AuthorizeSpotify from '../../spotify/AuthorizeSpotify'
import { Skeleton } from 'primereact/skeleton'
import { AlbumsContext, SpotifyContext, UserContext } from '../../context'
import { AlbumData, SavedSpotifyAlbum, UserAlbumData } from '../../types'
import AlbumsCarousel from '../common/AlbumsCarousel'
import { AppRoute } from '../../routes'
import { getUsersAlbums } from '../../services/spotifyService'
import { transformSpotifyAlbum } from '../../utils/transformer'
import ProfileStats from './ProfileStats'

const ProfilePage: React.FC = () => {
  const { user } = React.useContext(UserContext)
  const { albums } = React.useContext(AlbumsContext)
  const { tokens } = React.useContext(SpotifyContext)
  const [usersAlbums, setUsersAlbums] = React.useState<UserAlbumData[] | null>(null)
  const [savedAlbums, setSavedAlbums] = React.useState<AlbumData[] | null>(null)

  useEffect(() => {
    if (user && albums) {
      const filteredAlbums = albums.filter(album => album.user.username === user.username)
      setUsersAlbums(filteredAlbums.reverse())
    }
  }, [user, albums])

  useEffect(() => {
    fetchSavedAlbums()
  }, [user, tokens])

  const fetchSavedAlbums = async () => {
    if (user && tokens && tokens.token) {
      const a = await getUsersAlbums(tokens.token, 10, 0)
      transformSavedAlbums(a)
    }
  }

  const transformSavedAlbums = (s: SavedSpotifyAlbum[] | null) => {
    const l: AlbumData[] = []
    s?.forEach(a => {
      const t = transformSpotifyAlbum(a.album, null, false)
      l.push(t)
    })
    setSavedAlbums(l)
  }

  return (
    <>
      <AuthorizeSpotify />
      {usersAlbums && <ProfileStats albums={usersAlbums}/>}
      <AlbumsCarousel albums={usersAlbums} header='Recents' route={AppRoute.Search} />
      {savedAlbums 
        ? 
        (<AlbumsCarousel albums={savedAlbums} header='Saved Albums' route={AppRoute.Search} />) 
        : 
        ( <div>
          <div className='header-link-container'>
            <h1 className='header-link-title'>Saved Albums</h1>
          </div>
          <Skeleton height='400px' width='100%' className='m-2'></Skeleton>
        </div>)
      }
    </>
  )
}

export default ProfilePage
