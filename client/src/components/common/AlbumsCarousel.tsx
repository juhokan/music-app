import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Album from './Album'
import { AlbumData, UserAlbumData } from '../../types'
import { AppRoute } from '../../routes'
import HeaderLink from './HeaderLink'

interface AlbumCarouselProps {
  readonly albums: AlbumData[] | UserAlbumData[] | null;
  readonly header: string
  readonly route: AppRoute | null
}

const AlbumsCarousel: React.FC<AlbumCarouselProps> = ({ albums, header, route }) => {
  const responsive = {
    lgDesktop: {
      breakpoint: { max: 3500, min: 2560 },
      items: 6,
      partialVisibilityGutter: 30
    },
    mdDesktop: {
      breakpoint: { max: 2560, min: 1920 },
      items: 5,
      partialVisibilityGutter: 30
    },
    smDesktop: {
      breakpoint: { max: 1920, min: 1280 },
      items: 4,
      partialVisibilityGutter: 30
    },
    xsDesktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30
    }
  }


  return (
    <>
      {albums && (
        <div >
          {route ? <HeaderLink header={header} route={route}/> 
            : 
            <div className='header-link-container'>
              <h1 className='header-link-title'>{header}</h1>
            </div>
          }
          <Carousel
            className='album-carousel carousel-container'
            partialVisible={true}
            swipeable={true}
            draggable={true}
            responsive={responsive}
          >
            {albums.map(a => (
              <Album 
                key={a.album_id} 
                name={a.title} 
                id={a.album_id} 
                artistName={a.artist} 
                image={a.image_url} 
                rating={a.rating} />
            ))}
          </Carousel>
        </div>
      )}
    </>
  )
}

export default AlbumsCarousel

