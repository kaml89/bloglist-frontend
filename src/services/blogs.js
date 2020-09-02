import axios from 'axios'
const baseUrl = '/api/blogs'

//let token = null

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

const getAll = async (token) => {
  //const response = await axios.get(baseUrl, tokenConfig(token))
  const response = await axios.get(baseUrl)
  return response.data
}

// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`
// }

const create = async (newObj, token) => {
  // const config = {
  //   headers: {
  //     Authorization: token
  //   }
  // }

  const config = tokenConfig(token)
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async (updatedObj, id, token) => {
  // const config = {
  //   headers: {
  //     Authorization: token
  //   }
  // }
  const config = tokenConfig(token)
  const response = await axios.put(`${baseUrl}/${id}`, updatedObj, config)
  return response.data
}

const deleteBlog = async (id, token) => {
  // const config = {
  //   headers: {
  //     Authorization: token
  //   }
  // }
  const config = tokenConfig(token)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, create, update, deleteBlog }