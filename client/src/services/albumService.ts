import axios from 'axios'
import AlbumData from '../interface/AlbumData'
const url = '/api/albums'

const getAlbums = async (): Promise<AlbumData[] | null> => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default { getAlbums }