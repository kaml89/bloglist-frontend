import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = ({ loggedUser }) => {
    return (
        <div>
            <Link to={'/blogs'}>Blogs</Link>
            <Link to={'/users'}>Users</Link>
            <span>{ loggedUser ? `${loggedUser.username} is logged in` : '' }</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedUser: state.auth.user
    }
}

export default connect(mapStateToProps)(Navbar)