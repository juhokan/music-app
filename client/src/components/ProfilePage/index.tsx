/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { IoPersonSharp } from "react-icons/io5"
import AuthorizeSpotify from '../../spotify/AuthorizeSpotify'
import { Skeleton } from 'primereact/skeleton'
import { AlbumsContext, SpotifyContext, UserContext } from '../../context'
import { AlbumData, SavedSpotifyAlbum, SpotifyUserData, UserAlbumData } from '../../types'
import AlbumsCarousel from '../common/AlbumsCarousel'
import { AppRoute } from '../../routes'
import { getMe, getUsersAlbums } from '../../services/spotifyService'
import { transformSpotifyAlbum } from '../../utils/transformer'
import ProfileStats from './ProfileStats'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

const ProfilePage: React.FC = () => {
  const { user, setUser } = React.useContext(UserContext)
  const { tokens, setTokens } = React.useContext(SpotifyContext)
  const { albums } = React.useContext(AlbumsContext)
  const [usersAlbums, setUsersAlbums] = React.useState<UserAlbumData[] | null>(null)
  const [savedAlbums, setSavedAlbums] = React.useState<AlbumData[] | null>(null)
  const [spotiyUser, setSpotiyUser] = React.useState<SpotifyUserData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (user && albums) {
      const filteredAlbums = albums.filter(album => album.user.username === user.username)
      setUsersAlbums(filteredAlbums.reverse())
    }
  }, [user, albums])

  useEffect(() => {
    fetchSavedAlbums()
    fetchSpotifyProfile()
  }, [user, tokens])

  const fetchSavedAlbums = async () => {
    if (user && tokens && tokens.token) {
      const a = await getUsersAlbums(tokens.token, 10, 0)
      transformSavedAlbums(a)
    }
  }

  const fetchSpotifyProfile = async () => {
    if (user && tokens && tokens.token) {
      const u = await getMe(tokens.token)
      setSpotiyUser(u)
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

  const handleLogOut = () => {
    setTokens(null)
    setUser(null)
    navigate(AppRoute.Home)
  }

  return (
    <>
      {user && 
      <>
        <div className='profile-data-container'>
          <div className='profile-data'>
            {spotiyUser ? <img src={spotiyUser.images[1].url} alt='profile image' className='profile-image' /> : 
              <div className='profile-image default-image'>
                <IoPersonSharp />
              </div>}
            <div>
              <h1>{user?.name}</h1>
              <h3>@{user?.username}</h3>
              {!tokens && <AuthorizeSpotify />}
            </div>
          </div>
          {usersAlbums && <ProfileStats albums={usersAlbums}/>}
        </div>
        <AlbumsCarousel albums={usersAlbums} header='Ratings' route={AppRoute.UserRatings} />
        {tokens && 
        (
          savedAlbums 
            ? 
            (<AlbumsCarousel albums={savedAlbums} header='Saved Albums' route={null} />) 
            : 
            ( <div>
              <div className='header-link-container'>
                <h1 className='header-link-title'>Saved Albums</h1>
              </div>
              <Skeleton height='400px' width='100%' className='m-2'></Skeleton>
            </div>)
        )
        }
        <div className='logout-container'>
          <Button onClick={handleLogOut}>Log Out</Button>
        </div>
      </>
      }
    </>
  )
}

export default ProfilePage
