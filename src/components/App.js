import React from 'react'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Notification from './Notification'
import LoginForm from './LoginForm'
import Togglable from './Togglable'

import { logout } from '../actions/actions'

const App = props => {
  const handleLogout = e => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    props.logout()
  }

  const renderLoginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={props.message} />
      <Togglable buttonLabel='log in'>
        <LoginForm />
      </Togglable>
    </div>
  )

  const renderBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <h3>{props.user.name} logged in</h3>
        <Notification message={props.message} />

        <Togglable buttonLabel='create new blog'>
          <BlogForm />
        </Togglable>
        <button onClick={handleLogout}>logout</button>
        <BlogList />
      </div>
    )
  }
  return (
    <div>{props.user.isAuthenticated ? renderBlogs() : renderLoginForm()}</div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.notification,
    user: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
