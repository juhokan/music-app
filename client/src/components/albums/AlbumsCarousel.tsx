import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"
import { SpotifyContext } from '../../context'
import SpotifyAlbumData from '../../interface/SpotifyAlbumData'
import { getAlbum } from '../../services/spotifyService'
import { TEST_ALBUM_ID } from '../../config'
import Album from './Album'

const AlbumsCarousel: React.FC = () => {
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
      const test = await getAlbum(tokens.token, TEST_ALBUM_ID)
      return test
    }
    return null
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  return (
    <>
      {test && 
      <Carousel 
        responsive={responsive}
        infinite={true}>
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
        <Album name={test?.name} id={test?.id} artistName={test?.artists[0].name} image={test?.images[0].url} />
      </Carousel>}
    </>
  )
}

export default AlbumsCarousel
