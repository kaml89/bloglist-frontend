import React from 'react'
//import { connect } from 'react-redux'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className='notification'>{message}</div>
}

// const mapStateToProps = (state) => {
//   return {
//     message: state.notification
//   }
// }

//export default connect(mapStateToProps)(Notification)

export default Notification
