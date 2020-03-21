import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

import { 
  incrementLikes,
  showNotification,
  removeBlog,
  logout
 } from '../actions/actions'


const BlogList = (props) => {

  const handleLike = async (blog) => {
    try {
      const updatedObj = { ...blog, likes: blog.likes+1 }

      props.incrementLikes(updatedObj, blog.id)
      props.showNotification('you liked this post')

    } catch(error) {
      console.log(error)
    }
  }

  const handleLogout = e => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    props.logout()
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{props.user.name} logged in</h3>
      <Notification message={props.message} />
      <Togglable buttonLabel='create new blog'>
        <BlogForm />
      </Togglable>
      <button onClick={handleLogout}>logout</button>
      {props.blogs.map(blog => 
        <Link to={`/blogs/${blog.id}`}>
          <div>
            { blog.title, blog.author }
          </div>
        </Link>
      )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.items,
    user: state.auth,
    message: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementLikes: (blog, id) => dispatch(incrementLikes(blog, id)),
    showNotification: (message) => dispatch(showNotification(message)),
    removeBlog: (id) => dispatch(removeBlog(id)),
    logout: () => dispatch(logout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogList)