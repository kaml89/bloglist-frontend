import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../actions/actions'

const BlogForm = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    props.createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        label='title'
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        label='author'
        type='text'
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <input
        label='url'
        type='text'
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <button>add blog</button>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createBlog: blog => dispatch(createBlog(blog))
  }
}

export default connect(null, mapDispatchToProps)(BlogForm)
