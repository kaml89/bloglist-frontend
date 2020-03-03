import React, { useState } from 'react'
import { connect } from 'react-redux'
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
  )
}

const mapDisptachToProps = dispatch => {
  return {
    logInUserFetch: credentials => dispatch(logInUserFetch(credentials))
  }
}

export default connect(null, mapDisptachToProps)(LoginForm)
