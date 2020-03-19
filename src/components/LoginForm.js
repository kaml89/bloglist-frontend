import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Notification from './Notification'
import Togglable from './Togglable'
import { logInUserFetch } from '../actions/actions'


const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    props.logInUserFetch({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      {!props.user.isAuthenticated ? '' : <Redirect to='protected'/>}
      <h2>Log in to application</h2>
      <Notification message={props.message} />
      <Togglable buttonLabel='log in'>
        <form onSubmit={handleLogin}>
          Login:
          <br />
          <input
            type='text'
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <br />
          Password:
          <br />
          <input
            type='text'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <button>Log In</button>
        </form>
      </Togglable>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth 
  }
}

const mapDisptachToProps = dispatch => {
  return {
    logInUserFetch: credentials => dispatch(logInUserFetch(credentials))
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(LoginForm)
