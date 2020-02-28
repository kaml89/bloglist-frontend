import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { 
  incrementLikes,
  showNotification,
  removeBlog
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

  return (
    <div>
      {
        props.blogs.map(blog => 
          <Blog 
            key={blog.id}
            blog={blog}
            userId={props.user.user.id}
            handleLike={() => handleLike(blog)}
            removeBlog={() => props.removeBlog(blog.id)}
          />
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
    removeBlog: (id) => dispatch(removeBlog(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogList)