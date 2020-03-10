import axios from 'axios'

const baseUrl = '/api/users'

const tokenConfig = (token) => {
  const config = {
    'headers': {
      'Content-type': 'application/json'
    }
  }

  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }