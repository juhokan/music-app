import axios from 'axios'
import LoginCredentials from '../interface/LoginCredentials'
import UserData from '../interface/UserData'
const url = '/api/login'

const login = async (credentials: LoginCredentials): Promise<UserData | null> => {
  try {
    const response = await axios.post(url, credentials)
    return response.data
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

export default { login }