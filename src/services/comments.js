import axios from 'axios'

const baseUrl = '/api/blogs'
const tokenConfig = (token) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      } 
    }
  
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  
    return config
}

const getAll = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const add = async (newComment, id, token) => {
    const config = tokenConfig(token)
    const response = await axios.put(`${baseUrl}/${id}`, {data: newComment}, config)
    return response
}

export default { getAll, add }