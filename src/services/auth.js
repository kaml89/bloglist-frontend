import axios from 'axios'

const baseUrl = '/api/auth'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const register = async ( newUser ) => {
  const response = await axios.post(`${baseUrl}/register`, newUser)
  return response.data
}


export default { login, register }