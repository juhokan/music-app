import axios from 'axios'
import { CLIENT_ID, CLIENT_SECRET } from '../config'
import SpotifyAlbumData from '../interface/SpotifyAlbumData'

export const searchAlbums = async (token: string, key: string) => {
  try {
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: key,
        type: "album"
      }
    })
  
    return data.albums.items
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
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getNewReleases = async (token: string, limit: number) => {
  try {
    const {data} = await axios.get(`https://api.spotify.com/v1/browse/new-releases`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: limit
      }
    })
    console.log(data)
    return data.albums.items
  } catch (error) {
    console.error("Error searching new releases:", error)
    throw error
  }
}

export const getUsersAlbums = async (token: string, limit: number, offset: number) => {
  try {
    const {data} = await axios.get(`https://api.spotify.com/v1/me/albums`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: limit,
        offset: offset
      }
    })
    console.log(data)
    return data.items
  } catch (error) {
    console.error("Error searching new releases:", error)
    throw error
  }
}

export const createAxiosResponseInterceptor = (refreshToken: string, setToken: (token: string | null) => void) => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        console.log('Non-401 error occurred:', error)
        return Promise.reject(error)
      }
      
      console.log('401 error detected, attempting token refresh...')

      axios.interceptors.response.eject(interceptor)

      if (refreshToken) {
        console.log('Refreshing token...')
        const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`

        const authData = new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
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
  
        console.log('Payload:', authData)

        return axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers })
          .then((response) => {
            console.log('Token refreshed successfully.')
            setToken(response.data.access_token)
            error.response.config.headers["Authorization"] = "Bearer " + response.data.access_token

            return axios(error.response.config)
          })
          .catch((error2) => {
            console.error('Error refreshing token:', error2)
            
            setToken(null)
            return Promise.reject(error2)
          })
          .finally(() => {
            console.log('Re-attaching interceptor after token refresh.')
            createAxiosResponseInterceptor(refreshToken, setToken)
          })
      }
    }
  )
}