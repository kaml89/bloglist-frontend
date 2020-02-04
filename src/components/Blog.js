import React, { useState } from 'react'

const Blog = ({ blog, userId, incrementLikes, removeBlog }) => {
  const [ visibility, setVisibility ] = useState(false)
  
  const { title, author, url, likes, id, user } = blog
  //console.log(blog.user, userId)
  return (
    <div style={{border:'solid 1px black', marginBottom: '2px'}}>
      <div onClick={() => setVisibility(!visibility)}>
        {title} {author}
      </div>
      <div className='details' style={{ display: visibility ? '' : 'none' }}>
        <a src=''>{url}</a>
        {likes} likes <button onClick={incrementLikes}>like</button>
        {author}
      </div> 
      <button
        onClick={removeBlog}
        style={{ display: user.id === userId ? ''  :'none' }}
      >
        delete
      </button>
    </div>
  )
}

export default Blog