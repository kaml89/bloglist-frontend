import React, { useState } from 'react'

const Blog = ({ blog, userId, handleLike, removeBlog }) => {
  const [visibility, setVisibility] = useState(false)

  const { title, author, url, likes, id, user } = blog
  return (
    <div style={{ border: 'solid 1px black', marginBottom: '2px' }}>
      <div onClick={() => setVisibility(!visibility)}>
        {title} {author}
      </div>
      <div className='details' style={{ display: visibility ? '' : 'none' }}>
        <a src=''>{url}</a>
        {likes} likes <button onClick={handleLike}>like</button>
        {author}
      </div>
      <button
        onClick={removeBlog}
        style={{ display: user === userId ? '' : 'none' }}
      >
        delete
      </button>
    </div>
  )
}

export default Blog
