import blogsService from '../services/blogs'
import loginService from '../services/login'

export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const RECEIVE_BLOGS = 'RECEIVE_BLOGS'
export const REQUEST_BLOGS = 'REQUEST_BLOGS'
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS'
export const INCREMENT_LIKES = 'INCREMENT_LIKES'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const REMOVE_BLOG_SUCCESS = 'REMOVE_BLOG_SUCCESS'
export const REMOVE_BLOG_FAILED = 'REMOVE_BLOG_FAILED'



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
    type: CREATE_BLOG_SUCCESS,
    payload
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await blogsService.create(blog, token)
    dispatch(createBlogSuccess(response))
  }
}

export const incrementLikes = (updatedBlog, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await blogsService.update(updatedBlog, id, token)
    dispatch({type: INCREMENT_LIKES, id})
  }
}

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

const loginFail = () => {
  return {
    type: LOGIN_FAIL
  }
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}


export const logInUserFetch = (credentials) => {
  return async dispatch => {
    //try {
      // const user = await loginService.login(credentials)
      // dispatch(loginSuccess(user))
      // localStorage.setItem('token', JSON.stringify(user.token))
    // } catch(error) {
    //   console.log(error)
    // }

    loginService.login(credentials)
      .then(res => {
        dispatch(loginSuccess(res))
        // localStorage.setItem('token', JSON.stringify(res.token))
        // localStorage.setItem('user', JSON.stringify(res))
      })
      .catch(error => console.log(error))
  }
}

const removeBlogSuccess = (id) => {
  return {
    type: REMOVE_BLOG_SUCCESS,
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
