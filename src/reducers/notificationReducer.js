import * as type from "../actions/actionTypes"

const notificationReducer = (state='', action) => {
  switch(action.type) {
    case type.SET_NOTIFICATION:
      return action.message
    case type.REMOVE_NOTIFICATION:
      return ''
    default:
      return state
  }
}

export default notificationReducer