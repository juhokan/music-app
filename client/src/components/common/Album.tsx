import React from 'react'
import { useNavigate } from 'react-router-dom'

interface AlbumProps {
  id: string;
  image: string;
  name: string
  artistName: string
  rating: number | null
}

const Album: React.FC<AlbumProps> = ({ id, image, name, artistName, rating }) => {
  const navigate = useNavigate()

  const handleAlbumClick = () => {
    navigate(`/${id}`)
  }

  return (
    <div onClick={handleAlbumClick} className='album-card'>
      <div className='album-card-cover'>
        {rating && 
        <div className='album-card-rating'>
          <h3>{rating}</h3>
        </div>}
        <img src={image} alt='album'className='album-card-cover'/>
      </div>
      <div className='album-card-title-container'>
        <h2 className='album-card-title'>{name}</h2>
        <h3 className='album-card-artist'>{artistName}</h3>
      </div>
    </div>
  )
}

export default Album
