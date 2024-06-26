/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Album from './Album'
import { AlbumData } from '../../interface/AlbumData'

interface AlbumCarouselProps {
  readonly albums: AlbumData[] | null;
}

const AlbumsCarousel: React.FC<AlbumCarouselProps> = ({ albums }) => {
  useEffect(() => {
    console.log(albums)
  }, [albums])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
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
        <div className='carousel-container'>
          <Carousel
            className='album-carousel'
            partialVisible={true}
            swipeable={true}
            draggable={true}
            responsive={responsive}
          >
            {albums.map(a => (
              <Album key={a.album_id} name={a.title} id={a.album_id} artistName={a.artist} image={a.image_url} />
            ))}
          </Carousel>
        </div>
      )}
    </>
  )
}

export default AlbumsCarousel

