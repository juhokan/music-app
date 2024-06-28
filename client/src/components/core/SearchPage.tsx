/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { SpotifyContext } from "../../context"
import { searchAlbums } from "../../services/spotifyService"
import SpotifyAlbumData from "../../interface/SpotifyAlbumData"
import AlbumGrid from "../albums/AlbumGrid"
import { AlbumData } from "../../interface/AlbumData"
import { transformSpotifyAlbum } from "../../utils/transformer"

interface AlbumSearchProps {
  readonly inputValue: string | null
}

const SearchPage: React.FC<AlbumSearchProps> = ({ inputValue }) => {
  const { tokens } = React.useContext(SpotifyContext)
  const [albums, setAlbums] = React.useState<SpotifyAlbumData[] | null>(null)
  const [pageInput, setPageInput] = React.useState('')

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

  const transformAlbumData = () => {
    if (albums) {
      const a: AlbumData[] = albums.map(a => transformSpotifyAlbum(a, null, false)) 
      return a
    }
    return null
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={pageInput} className='search-page' onChange={handleInputChange}/>
      </form>

      <div className='album-card-page-container'> 
        {albums && <AlbumGrid albums={transformAlbumData()}/>}
      </div>
    </div>
  )
}

export default SearchPage