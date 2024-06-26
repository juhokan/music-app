import axios from 'axios'
import LoginCredentials from '../interface/LoginCredentials'
const url = '/api/login'

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(url, credentials)
  return response.data
}

export default { login }