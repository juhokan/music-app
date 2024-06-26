import axios from 'axios'
import LoginCredentials from '../interface/LoginCredentials'
const baseUrl = '/api/login'

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }