import blogsService from '../services/blogs'

export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const RECEIVE_BLOGS = 'RECEIVE_BLOGS'
export const REQUEST_BLOGS = 'REQUEST_BLOGS'
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS'
export const INCREMENT_LIKES = 'INCREMENT_LIKES'


export const setNotification = (message) => {
  return {
    type: SET_NOTIFICATION,
    message
  }
}

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION
  }
}

export const showNotification = (message) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export const requestBlogs = () => {
  return {
    type: REQUEST_BLOGS
  }
}

export const receiveBlogs = (blogs) => {
  return {
    type: RECEIVE_BLOGS,
    blogs
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    dispatch(requestBlogs)
    const response = await blogsService.getAll()
    dispatch(receiveBlogs(response))
  }
}

const createBlogSuccess = (response) => {
  return {
    type: CREATE_BLOG_SUCCESS,
    response
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const response = await blogsService.create(blog)
    dispatch(createBlogSuccess(response))
  }
}

export const incrementLikes = (updatedBlog, id) => {
  return async dispatch => {
    const response = await blogsService.update(updatedBlog, id)
    dispatch({type: INCREMENT_LIKES, id})
  }
}

