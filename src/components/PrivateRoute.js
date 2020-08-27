import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar'

const PrivateRoute = ({ children, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          <Navbar/>,
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps)(PrivateRoute)
