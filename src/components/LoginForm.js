import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  }) => {

  return (
    <form onSubmit={handleSubmit}>
      Login:<br/> 
      <input type='text' 
            onChange={handleUsernameChange} 
            value={username}
      /><br/>

      Password:<br/> 
      <input type='text' 
            onChange={handlePasswordChange}
            value={password}
      /><br/>
      <button>Log In</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm