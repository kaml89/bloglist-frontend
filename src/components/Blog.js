import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'

import {
  incrementLikes,
  removeBlog,
  showNotification
} from '../actions/actions'

const Blog = ({blog, userId, removeBlog, incrementLikes, showNotification, history }) => {
  const [visibility, setVisibility] = useState(false)
  const { id } = useParams()

  const handleLike = async likedBlog => {
    try {
      const updatedObj = { ...likedBlog, likes: likedBlog.likes + 1 }

      incrementLikes(updatedObj, likedBlog.id)
      showNotification('you liked this post')
    } catch (error) {
      console.log(error)
    }
  }

  const { title, author, url, likes, user, comments } = blog
  console.log(history)
  return (
    <div style={{ border: 'solid 1px black', marginBottom: '2px' }}>
      <div onClick={() => setVisibility(!visibility)}>
        {title} {author}
      </div>
      <div className='details' style={{ display: visibility ? '' : 'none' }}>
        <a href=''>{url}</a>
        {likes} likes <button onClick={() => handleLike(blog)}>like</button>
        {author}
        <div className='comments'>
          comments:
          <ul>
            {comments.map((item, i)=> <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
      <button
        onClick={() => removeBlog(blog.id, history)}
        style={{ display: user.id === userId ? '' : 'none' }}
      >
        delete
      </button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.items.find(item => item.id === ownProps.match.params.id),
    userId: state.auth.user.id
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    incrementLikes: (blog, id) => dispatch(incrementLikes(blog, id)),
    removeBlog: (id, history) => dispatch(removeBlog(id, history)),
    showNotification: message => dispatch(showNotification(message))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
