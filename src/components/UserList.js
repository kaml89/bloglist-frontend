import React, { useEffect } from 'react'
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import { getAllUsers } from '../actions/actions'

const UserList = ({ users, getAllUsers}) => {
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      {
        users.map(user => 
          <Link to={`users/${user.id}`}>
            <div key={user.id}>{ user.name } <span> { user.blogs.length } </span></div>
          </Link>
        )
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)