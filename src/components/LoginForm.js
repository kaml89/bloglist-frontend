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
      props.logInUserFetch({username, password})

    } catch(error) {
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