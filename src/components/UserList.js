import React from 'react'
import { connect } from 'react-redux' 
import { getAllUsers } from '../actions/actions'

const UserList = ( props ) => {
  return (
    <div>
      {
        props.users.map(user => 
          <div key={user.id}>{ user.name }</div>
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