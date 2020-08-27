import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import BlogList from './BlogList'
import LoginForm from './LoginForm'
import UserList from './UserList'
import PrivateRoute from './PrivateRoute'
import Blog from './Blog'
import User from './User'
import Navbar from './Navbar'

const App = props => {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={ LoginForm } />
          <Route path='/login' component={ LoginForm } />
          <Route path='/public' component={ LoginForm } />
          <PrivateRoute path='/blogs/:id'>
            <Navbar/>
            <Blog/>
          </PrivateRoute>
          <PrivateRoute path='/blogs'>
            <Navbar/>
            <BlogList />
          </PrivateRoute>
          <PrivateRoute path='/users/:id'>
            <Navbar/>
            <User />
          </PrivateRoute>
          <PrivateRoute path='/users'>
            <Navbar/>
            <UserList />
          </PrivateRoute>
          
        </Switch>
      </div>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}


export default connect(mapStateToProps)(App)
