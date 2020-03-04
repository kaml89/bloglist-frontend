import blogsService from '../services/blogs'
import loginService from '../services/login'

import * as type from './actionTypes'

export const setNotification = (message) => {
  return {
    type: type.SET_NOTIFICATION,
    message
  }
}

export const removeNotification = () => {
  return {
    type: type.REMOVE_NOTIFICATION
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
    type: type.REQUEST_BLOGS
  }
}

export const receiveBlogs = (blogs) => {
  return {
    type: type.RECEIVE_BLOGS,
    blogs
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    try {
      dispatch(requestBlogs())
      const response = await blogsService.getAll()
      dispatch(receiveBlogs(response))
    }
    catch(error) {
      console.log(error)
    }
  }
}

const createBlogSuccess = (payload) => {
  return {
    type: type.CREATE_BLOG_SUCCESS,
    payload
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token
      const response = await blogsService.create(blog, token)
      dispatch(createBlogSuccess(response))
      dispatch(showNotification('blog has been succesfully created!'))
    } catch(error) {
      console.log(error)
      dispatch(showNotification('blog could not have been created!'))
    }
    
  }
}

export const incrementLikes = (updatedBlog, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await blogsService.update(updatedBlog, id, token)
    dispatch({type: type.INCREMENT_LIKES, response})
  }
}

const loginSuccess = (payload) => {
  return {
    type: type.LOGIN_SUCCESS,
    payload
  }
}

const loginFail = () => {
  return {
    type: type.LOGIN_FAIL
  }
}

export const logout = () => {
  return {
    type: type.LOGOUT_SUCCESS
  }
}


export const logInUserFetch = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch(loginSuccess(user))
      dispatch(getAllBlogs())
      
    } catch(error) {
      dispatch(showNotification('incorrect login or password'))
      console.log(error)
    }

    // loginService.login(credentials)
    //   .then(res => {
    //     dispatch(loginSuccess(res))
    //   })
    //   .catch(error => console.log(error))
  }
}

const removeBlogSuccess = (id) => {
  return {
    type: type.REMOVE_BLOG_SUCCESS,
    id
  }
} 

export const removeBlog = (id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token
    blogsService.deleteBlog(id, token)
      .then(res => {
        dispatch(removeBlogSuccess(id))
      })
      .catch(error => console.log(error))
  }
}
