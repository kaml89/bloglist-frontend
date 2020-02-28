import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  logInUserFetch,
  getAllBlogs,
  showNotification
} from '../actions/actions'

const LoginForm = (props) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // const loggedUser = await loginService.login({username, password})
      // console.log(user)
      // localStorage.setItem('user', JSON.stringify(loggedUser))
      
      // setUser(loggedUser)
      // const fetchedBlogs = await blogsService.getAll()
      // fetchedBlogs.sort((a, b) => b.likes - a.likes)
      // setBlogs([...fetchedBlogs])
      props.logInUserFetch({username, password})
      props.getAllBlogs()
      console.log('kkakakak')

    } catch(error) {
      props.showNotification('incorrect login or password')
    }
    setUsername('')
    setPassword('')
  }
  
  return (
    <form onSubmit={handleLogin}>
      Login:<br/> 
      <input type='text' 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
      /><br/>

      Password:<br/> 
      <input type='text' 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
      /><br/>
      <button>Log In</button>
    </form>
  )
}

const mapDisptachToProps = dispatch => {
  return {
    logInUserFetch: (credentials) => dispatch(logInUserFetch(credentials)),
    getAllBlogs: () => dispatch(getAllBlogs()),
    showNotification: (message) => dispatch(showNotification(message))
  }
}

// LoginForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   handleUsernameChange: PropTypes.func.isRequired,
//   handlePasswordChange: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired
// }

export default connect(null, mapDisptachToProps)(LoginForm)