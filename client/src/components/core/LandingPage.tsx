import React from 'react'
import AuthorizeSpotify from '../spotify/AuthorizeSpotify'
import AlbumsCarousel from '../albums/AlbumsCarousel'

const LandingPage: React.FC = () => {
 
  return (
    <>
      <AuthorizeSpotify />
      <AlbumsCarousel />
    </>

  )
}

export default LandingPage
