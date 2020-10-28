import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Notification from './Notification'
import Togglable from './Togglable'
import { logInUserFetch } from '../actions/actions'


const LoginForm = props => {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const { register, handleSubmit, watch, errors} = useForm()
  const onSubmit = data => {
    console.log(data)
    props.logInUserFetch(data)
  }
  // const handleLogin = e => {
  //   e.preventDefault()
  //   props.logInUserFetch({ username, password })
  //   setUsername('')
  //   setPassword('')
  // }

  return (
    <div>
      {!props.user.isAuthenticated ? '' : <Redirect to='blogs'/>}
      <h2>Log in to application</h2>
      <Notification message={props.message} />
      <Togglable buttonLabel='log in'>
        <form onSubmit={handleSubmit(onSubmit)}>
          Login:
          <br />
          <input
            name='username'
            type='text'
            ref={register}
            
            
          />
          <br />
          Password:
          <br />
          <input
            name='password'
            type='text'
            ref={register}
      
            
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
