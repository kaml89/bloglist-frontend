import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogsService from '../services/blogs'
import loginService from '../services/login'
import Blog from './Blog'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Notification from './Notification'
import LoginForm from './LoginForm'
import Togglable from './Togglable'

import { 
  showNotification, 
  getAllBlogs, 
  createBlog, 
  incrementLikes, 
  logInUserFetch,
  logout,
  removeBlog
} from '../actions/actions'

const App = (props) => {
  const [ user, setUser] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ blogs, setBlogs ] = useState([])
  
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')


  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")))
    
  // }, [])


  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   try {
  //     props.logInUserFetch({username, password})
  //     props.getAllBlogs()

  //   } catch(error) {
  //     props.showNotification('incorrect login or password')
  //     console.log(error)
  //   }
  //   setUsername('')
  //   setPassword('')
  // }

  const handleLogout = (e) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    props.logout()

  }

  const addNewBlog = async (e) => {
    e.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url
      }
  
      // blogsService.setToken(props.user.token)
      props.createBlog(newBlog)
      //const createdBlog = await blogsService.create(newBlog)
      //setBlogs([...blogs, createdBlog])

      props.showNotification('blog has been succesfully created!')
    } catch(error) {
        props.showNotification('blog could not have been created')
        console.log(error)
    }
  }

  // const handleLike = async (blog) => {
  //   try {
  //     const updatedObj = { ...blog, likes: blog.likes+1 }

  //     // blogsService.setToken(props.user.token)
  //     props.incrementLikes(updatedObj, blog.id)
  //     //const response = await blogsService.update(updatedObj, blog.id)
  //     // console.log(response)
  //     // const newBlogs = blogs
  //     //   .filter((item) => item.id !== blog.id)
  //     //   .concat(updatedObj)
  //     // newBlogs.sort((a, b) => b.likes - a.likes)
      
  //     props.showNotification('you liked this post')

  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  // const removeBlog = async (blog) => {
  //   try {
  //     // blogsService.setToken(props.user.token)
  //     if (window.confirm('Do you really want to remove this blog?')) {
  //       const response = await blogsService.deleteBlog(blog.id)
  //       const newBlogs = blogs
  //       .filter((item) => item.id !== blog.id)
  //       setBlogs(newBlogs)
  //     }
      
      
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  const renderLoginForm = () => (
    <div>    
        <h2>Log in to application</h2>
        <Notification message={props.message}/>
        <Togglable buttonLabel='log in'>
          <LoginForm 
            // handleSubmit={handleLogin}
            // handleUsernameChange={(e) => setUsername(e.target.value)}
            // handlePasswordChange={(e) => setPassword(e.target.value)}
            // username={username}
            // password={password}
          />
        </Togglable>
      </div>
  )

  const renderBlogs = () => {
    //console.log(props.blogs)
    return (
      <div>
        <h2>blogs</h2>
        <h3>{props.user.name} logged in</h3>
        <Notification message={props.message} />
        
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
        <BlogList />
         { /*props.blogs.map((blog) =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            userId={props.user.user.id}
            handleLike={ () => handleLike(blog) }
            removeBlog={ () => props.removeBlog(blog.id) }
          />
        )*/
        }
      </div>
    )
  }
  return (
    <div>
      
      { 
        // props.user.username ? 
        props.user.isAuthenticated ?
        renderBlogs() :
        renderLoginForm()
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification,
    blogs: state.blogs.items,
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //showNotification: (message) => dispatch(showNotification(message)),
    getAllBlogs: () => dispatch(getAllBlogs()),
    createBlog: (blog) => dispatch(createBlog(blog)),
    //incrementLikes: (blog, id) => dispatch(incrementLikes(blog, id)),
    //logInUserFetch: (credentials) => dispatch(logInUserFetch(credentials)),
    logout: () => dispatch(logout()),
    //removeBlog: (id) => dispatch(removeBlog(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
