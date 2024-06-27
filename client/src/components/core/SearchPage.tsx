import React, { useContext, useState, useEffect } from "react"
import { SpotifyContext } from "../../context"
import { searchAlbums } from "../../services/spotifyService"
import Album from "../albums/Album"
import SpotifyAlbumData from "../../interface/SpotifyAlbumData"

interface AlbumSearchProps {
  readonly inputValue: string | null
}

const SearchPage: React.FC<AlbumSearchProps> = ({ inputValue }) => {
  const { tokens } = useContext(SpotifyContext)
  const [albums, setAlbums] = useState<SpotifyAlbumData[] | null>(null)
  const [pageInput, setPageInput] = useState('')

  useEffect(() => {
    if (inputValue) {
      setPageInput(inputValue)
      fetchAlbums(inputValue)
    }
  }, [])

  const fetchAlbums = async (v: string) => {
    try {
      if (tokens?.token) {
        const i = await searchAlbums(tokens.token, v)
        setAlbums(i)
      }
    } catch (error) {
      console.error("Error fetching albums:", error)
    }
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchAlbums(pageInput)
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={pageInput} className='search-page' onChange={handleInputChange}/>
      </form>

      <div className='album-card-page-container'> 
        {albums && albums.map(album => (
          <Album 
            key={album.id} 
            id={album.id} 
            image={album.images[0].url} 
            name={album.name} 
            artistName={album.artists[0].name}/>
        ))}
      </div>
    </div>
  )
}

export default SearchPage