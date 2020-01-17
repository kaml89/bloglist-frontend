import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addNewBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {

  return (
    <form onSubmit={addNewBlog}>
      <input label='title' type='text' value={title} onChange={handleTitleChange}/>
      <input label='author' type='text' value={author} onChange={handleAuthorChange}/>
      <input label='url' type='text' value={url} onChange={handleUrlChange}/>
      <button>add blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm