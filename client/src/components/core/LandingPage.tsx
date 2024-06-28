import React from 'react'
import AuthorizeSpotify from '../spotify/AuthorizeSpotify'
import AlbumsCarousel from '../albums/AlbumsCarousel'
import { AlbumsContext } from '../../context'
import { AppRoute } from '../../routes'

const LandingPage: React.FC = () => {

  const { albums } = React.useContext(AlbumsContext)
  const newest = albums ? [...albums].reverse() : null
 
  return (
    <>
      <AuthorizeSpotify />
      <a href={AppRoute.Search}>Search</a>
      <AlbumsCarousel albums={newest} header='Recents' route={AppRoute.Search}/>
    </>

  )
}

export default LandingPage
