import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'

import {
  incrementLikes,
  removeBlog,
  showNotification,
  getAllBlogs,
  addComment
} from '../actions/actions'

const Blog = ({blog, userId, removeBlog, incrementLikes, showNotification, getAllBlogs, history, addComment }) => {
  const [visibility, setVisibility] = useState(false)
  const [comment, setComment] = useState('')
  const { id } = useParams()

  useEffect(() => {
    getAllBlogs()
  }, [])

  const handleLike = async likedBlog => {
    try {
      incrementLikes(likedBlog, likedBlog.id)
      showNotification('you liked this post')
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddComment = (e, id) => {
    e.preventDefault()
    addComment(comment, id)
  }

  const { title, author, url, likes, user, comments } = blog
  
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
          <form onSubmit={(e) => handleAddComment(e, blog.id)}>
            <input 
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
            <button>add comment</button>
          </form>
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
    showNotification: message => dispatch(showNotification(message)),
    getAllBlogs: () => dispatch(getAllBlogs()),
    addComment: (comment, id) => dispatch(addComment(comment, id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
