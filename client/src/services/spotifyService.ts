import axios from 'axios'
import { CLIENT_ID, CLIENT_SECRET } from '../config'
import SpotifyAlbumData from '../interface/SpotifyAlbumData'
import SpotifyToken from '../interface/SpotifyToken'
import { SpotifyUserData } from '../interface/SpotifyUserData'

export const searchAlbums = async (token: string, key: string): Promise<SpotifyAlbumData[] | null> => {
  try {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: key,
        type: "album"
      }
    })

    return data.albums.items as SpotifyAlbumData[]
  } catch (error) {
    console.error("Error searching albums:", error)
    throw error
  }
}

export const getAlbum = async (token: string, id: string): Promise<SpotifyAlbumData | null> => {
  try {
    const { data } = await axios.get<SpotifyAlbumData>(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getNewReleases = async (token: string, limit: number): Promise<SpotifyAlbumData[] | null> => {
  try {
    const { data } = await axios.get(`https://api.spotify.com/v1/browse/new-releases`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: limit
      }
    })
    return data.albums.items as SpotifyAlbumData[]
  } catch (error) {
    console.error("Error searching new releases:", error)
    throw error
  }
}

export const getUsersAlbums =
  async (token: string, limit: number, offset: number): Promise<SpotifyAlbumData[] | null> => {
    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/me/albums`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: limit,
          offset: offset
        }
      })
      return data.items as SpotifyAlbumData[]
    } catch (error) {
      console.error("Error searching new releases:", error)
      throw error
    }
  }

export const refreshSpotifyToken = async (refresh: string): Promise<SpotifyToken | null> => {
  const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
  
  const authData = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh,
    client_id: CLIENT_ID
  }).toString()
  
  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: authData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authHeader
    }
  }
  
  try {
    const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers })
  
    if (response && response.data.access_token) {
      const t: SpotifyToken = {
        token: response.data.access_token,
        refresh: refresh
      }
      return t
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getProfile = async (token: string): Promise<SpotifyUserData | null> => {
  try {
    const { data } = await axios.get<SpotifyUserData>(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}