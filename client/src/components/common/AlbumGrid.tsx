import React from 'react'
import { AlbumData, UserAlbumData } from '../../types'
import Album from './Album'

interface AlbumGridProps {
  readonly albums: AlbumData[] | UserAlbumData[] | null
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums }) => {
  return (
    <div className='album-grid-container'>
      {albums && albums.map(a => (
        <div className='album-item' key={a.album_id}>
          <Album 
            id={a.album_id}
            image={a.image_url}
            name={a.title}
            artistName={a.artist}
            rating={a.rating}
          />
        </div>
      ))}
    </div>
  )  
}

export default AlbumGrid