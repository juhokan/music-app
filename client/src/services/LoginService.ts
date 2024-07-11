import axios from 'axios'
import { LoginCredentials } from '../types'
import { UserData } from '../types'
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