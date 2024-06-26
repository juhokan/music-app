import React from 'react'
import AuthorizeSpotify from '../spotify/AuthorizeSpotify'
import AlbumsCarousel from '../albums/AlbumsCarousel'
import { AlbumsContext } from '../../context'

const LandingPage: React.FC = () => {

  const { albums } = React.useContext(AlbumsContext)
 
  return (
    <>
      <AuthorizeSpotify />
      <AlbumsCarousel albums={albums}/>
    </>

  )
}

export default LandingPage
