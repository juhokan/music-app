import React from 'react'
import { useNavigate } from 'react-router-dom'

interface AlbumPageProps {
  id: string;
  image: string;
  name: string
  artistName: string
}

const Album: React.FC<AlbumPageProps> = ({ id, image, name, artistName }) => {
  const navigate = useNavigate()

  const handleAlbumClick = () => {
    navigate(`/${id}`)
  }

  return (
    <div onClick={handleAlbumClick}>
      <img src={image} alt='album' height={'50px'}/>
      <h3>{name}</h3>
      <h5>{artistName}</h5>
    </div>
  )
}

export default Album
