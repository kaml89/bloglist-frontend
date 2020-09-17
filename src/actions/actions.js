import blogsService from '../services/blogs'
import authService from '../services/auth'
import usersService from '../services/users'
import commentsService from '../services/comments'

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

const addCommentSuccess = (payload) => {
  return {
    type: type.ADD_COMMENT_SUCCESS,
    payload
  }
}

export const addComment = (comment, id) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token
      const response = await commentsService.add(id, comment, token)
      dispatch(addCommentSuccess(response.data))
    } catch(error) {
      console.log(error)
      dispatch(showNotification('could not add comment'))
    }
  }
}

const createUserSuccess = (payload) => {
  return {
    type: type.CREATE_USER_SUCCESS,
    payload
  }
}

export const createUser = (newUser) => {
  return async (dispatch) => {
    try {
      const response = await authService.register(newUser)
      dispatch(createUserSuccess(response))
    } catch(error) {
      dispatch(showNotification('could not create account'))
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
      const user = await authService.login(credentials)
      dispatch(loginSuccess(user))
      dispatch(getAllBlogs())
      dispatch(getAllUsers())
      
    } catch(error) {
      dispatch(showNotification('incorrect login or password'))
      console.log(error)
    }

    // authService.login(credentials)
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

export const removeBlog = (id, history) => {
  return (dispatch, getState) => {
    const token = getState().auth.token
    blogsService.deleteBlog(id, token)
      .then(res => {
        history.push('/blogs')
        dispatch(removeBlogSuccess(id))
        
      })
      .catch(error => console.log(error))
  }
}

const requestUsers = () => {
  return {
    type: type.REQUEST_USERS
  }
}

const receiveUsers = (payload) => {
  return {
    type: type.RECEIVE_USERS,
    payload
  }
}

export const getAllUsers = () => {
  return dispatch => {
    dispatch(requestUsers())
    usersService.getAll()
      .then(response => {
        dispatch(receiveUsers(response))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

