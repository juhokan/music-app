import axios from 'axios'
import { AlbumData, UserAlbumData } from '../types'
import { SERVER_URL } from '../config'
const url = `${SERVER_URL}/api/albums`

export const getAlbums = async (): Promise<UserAlbumData[] | null> => {
  try {
    const response = await axios.get(url)
    return response.data as UserAlbumData[]
  } catch (error) {
    console.error(error)
    return null
  }
}

export const postAlbum = async (album: AlbumData, token: string): Promise<AlbumData | null> => {
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
    console.error(error)
    return null
  }
}

export const putAlbum = async (album: AlbumData, token: string, id: string): Promise<AlbumData | null> => {
  try {
    const data = JSON.stringify(album)
    const response = await axios.put(`${url}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data as AlbumData
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteAlbum = async (token: string, id: string) => {
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}