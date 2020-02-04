import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import { showNotification } from './actions/actions'

const App = (props) => {
  const [ user, setUser] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ blogs, setBlogs ] = useState([])
  
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
      props.showNotification('incorrect login or password')
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
      setBlogs([...blogs, createdBlog])
      props.showNotification('blog has been succesfully created!')
    } catch(error) {
        props.showNotification('blog could not have been created')
        console.log(error)
    }
  }

  const incrementLikes = async (blog) => {
    try {
      const updatedObj = { ...blog, user:user.id, likes: blog.likes+1 }

      blogsService.setToken(user.token)
      const response = await blogsService.update(updatedObj, blog.id)
      console.log(response)
      const newBlogs = blogs
        .filter((item) => item.id !== blog.id)
        .concat(updatedObj)
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
      props.showNotification('you liked this post')

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
        <Notification />
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
        <Notification message={props.message}/>
        
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

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (message) => dispatch(showNotification(message)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
