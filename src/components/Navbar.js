import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/actions'

const Navbar = ({ loggedUser, logout }) => {

    const handleLogout = e => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        logout()
    }

    return (
        
        <div>
            <Link to={'/blogs'}>Blogs </Link>
            <Link to={'/users'}>Users </Link>
            { loggedUser ?  '' : <Link to={'/login'}>Log In </Link> }
            { loggedUser ?  '' : <Link to={'/signup'}>Sign Up </Link> }

            <span>{ loggedUser ? `${loggedUser.username} is logged in` : '' }</span>

            { loggedUser ? <button onClick={ handleLogout }>logout</button> : ''}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedUser: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)