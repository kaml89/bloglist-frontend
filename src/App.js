import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [ user, setUser] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ blogs, setBlogs ] = useState([])
  const [ message, setMessage ] = useState(null)
  
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const loggedUser = await loginService.login({username, password})
      console.log(user)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      
      setUser(loggedUser)
      const fetchedBlogs = await blogsService.getAll()
      fetchedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs([...fetchedBlogs])


    } catch(error) {
      setMessage(`Incorrect login or password`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(error)
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = (e) => {
    localStorage.removeItem("user")
    setUser(null)

  }

  const addNewBlog = async (e) => {
    e.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url
      }
  
      blogsService.setToken(user.token)
      const createdBlog = await blogsService.create(newBlog)
      setMessage('blog has been succesfully created!')
      setBlogs([...blogs, createdBlog])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(error) {
        setMessage('blog could not have been created')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        console.log(error)
    }
  }

  const incrementLikes = async (blog) => {
    try {
      const updatedObj = { ...blog, user:user.id, likes: blog.likes+1 }

      blogsService.setToken(user.token)
      const response = await blogsService.update(updatedObj, blog.id)
      const newBlogs = blogs
        .filter((item) => item.id !== blog.id)
        .concat(updatedObj)
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)

    } catch(error) {
      console.log(error)
    }
  }

  const removeBlog = async (blog) => {
    try {
      blogsService.setToken(user.token)
      if (window.confirm('Do you really want to remove this blog?')) {
        const response = await blogsService.deleteBlog(blog.id)
        const newBlogs = blogs
        .filter((item) => item.id !== blog.id)
        setBlogs(newBlogs)
      }
      
      
    } catch(error) {
      console.log(error)
    }
  }

  const renderLoginForm = () => (
    <div>    
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <Togglable buttonLabel='log in'>
          <LoginForm 
            handleSubmit={handleLogin}
            handleUsernameChange={(e) => setUsername(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
  )

  const renderBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <h3>{user.name} logged in</h3>
        <Notification message={message}/>
        
        <Togglable buttonLabel='create new blog'>
          <BlogForm
            addNewBlog={ addNewBlog }
            handleTitleChange={ (e) => setTitle(e.target.value) }
            handleAuthorChange={ (e) => setAuthor(e.target.value) }
            handleUrlChange={ (e) => setUrl(e.target.value) }
            title={ title }
            author={ author }
            url={ url }
          />
        </Togglable>
          
        <button onClick={handleLogout}>logout</button>
        { blogs.map((blog) => 
          <Blog 
            key={blog.id} 
            blog={blog} 
            userId={user.id}
            incrementLikes={ () => incrementLikes(blog) }
            removeBlog={ () => removeBlog(blog) }

          />
        ) }
      </div>
    )
  }

  return (
    <div>
      { 
        user === null ?
        renderLoginForm() : 
        renderBlogs()
      }
    </div>
  )
}

export default App
