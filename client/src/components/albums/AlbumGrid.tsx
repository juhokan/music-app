import React from 'react'
import { AlbumData } from '../../interface/AlbumData'
import Album from './Album'

interface AlbumGridProps {
  readonly albums: AlbumData[] | null
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
          />
        </div>
      ))}
    </div>
  )  
}

export default AlbumGrid