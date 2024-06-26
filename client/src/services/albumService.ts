import axios from 'axios'
import { PostAlbumData, AlbumData } from '../interface/AlbumData'
const url = '/api/albums'

export const getAlbums = async (): Promise<AlbumData[] | null> => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const postAlbum = async (album: PostAlbumData, token: string): Promise<AlbumData | null> => {
  try {
    const data = JSON.stringify(album)
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data as AlbumData
  } catch (error) {
    console.error('Error posting album:', error)
    return null
  }
}