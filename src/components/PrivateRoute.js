import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, auth, ...rest }) => {
  console.log(auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
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


export default PrivateRoute
